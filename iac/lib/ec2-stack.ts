import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 既存のVPCを使用する場合（VPC_IDを環境変数または設定から取得）
    const vpc = ec2.Vpc.fromLookup(this, 'ImportedVpc', {
      vpcId: process.env.VPC_ID || 'vpc-xxxxxxxx',
    });

    // 一意のUUIDを生成
    const uuid = uuidv4().substring(0, 8);
    const sgName = `dev_neko_sg_${uuid}`;
    const instanceName = `dev_neko_ec2_${uuid}`;

    // セキュリティグループの作成
    const securityGroup = this.createSecurityGroup(vpc, sgName);

    // S3バケットとスクリプトアップロードの作成
    const scriptBucket = this.createScriptBucket(uuid);

    // AWS Secrets Managerの設定
    const googleApiKeySecret = this.createGoogleApiKeySecret();

    // EC2インスタンスの作成
    const instance = this.createEC2Instance(vpc, securityGroup, instanceName, scriptBucket, googleApiKeySecret);

    // インスタンス起動時に実行するスクリプト
    this.configureUserData(instance, scriptBucket);

    // Route 53設定
    const hostedZone = this.setupRoute53(instance);

    // 出力設定
    this.defineOutputs(instance, instanceName, sgName, hostedZone);
  }

  /**
   * セキュリティグループを作成する
   */
  private createSecurityGroup(vpc: ec2.IVpc, sgName: string): ec2.SecurityGroup {
    // セキュリティグループの作成
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow SSH access',
      allowAllOutbound: true,
      securityGroupName: sgName,
    });

    // SSHアクセスを許可（22番ポート）
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access from anywhere'
    );

    // HTTPアクセスを許可（80番ポート）
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP access from anywhere'
    );

    // HTTPSアクセスを許可（443番ポート）
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS access from anywhere'
    );

    return securityGroup;
  }

  /**
   * S3バケットを作成してスクリプトをアップロードする
   */
  private createScriptBucket(uuid: string): s3.Bucket {
    // S3バケットの作成
    const bucket = new s3.Bucket(this, 'ScriptBucket', {
      bucketName: `dev-neko-scripts-${uuid}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // setup_scriptディレクトリのファイルをS3にアップロード
    new s3deploy.BucketDeployment(this, 'ScriptDeployment', {
      sources: [s3deploy.Source.asset(path.join(__dirname, 'setup_script'))],
      destinationBucket: bucket,
    });

    return bucket;
  }

  /**
   * Google GenAI API KeyのSecretを作成する
   */
  private createGoogleApiKeySecret(): secretsmanager.Secret {
    const googleApiKey = process.env.GOOGLE_GENAI_API_KEY || '';
    
    const secret = new secretsmanager.Secret(this, 'GoogleGenAIApiKey', {
      secretName: 'dev-neko/google-genai-api-key',
      description: 'Google Generative AI API Key for dev-neko project',
      secretStringValue: cdk.SecretValue.unsafePlainText(googleApiKey),
    });

    return secret;
  }

  /**
   * EC2インスタンスを作成する
   */
  private createEC2Instance(vpc: ec2.IVpc, securityGroup: ec2.SecurityGroup, instanceName: string, scriptBucket: s3.Bucket, googleApiKeySecret: secretsmanager.Secret): ec2.Instance {
    // EC2インスタンスの作成
    const instance = new ec2.Instance(this, 'Instance', {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup,
      keyName: process.env.KEY_PAIR_NAME || 'my-key-pair', // 既存のキーペア名を指定
      role: this.createInstanceRole(scriptBucket, googleApiKeySecret),
    });
    
    // インスタンスに名前タグを追加
    cdk.Tags.of(instance).add('Name', instanceName);

    return instance;
  }

  /**
   * EC2インスタンス用のIAMロールを作成する
   */
  private createInstanceRole(scriptBucket: s3.Bucket, googleApiKeySecret: secretsmanager.Secret): iam.Role {
    const role = new iam.Role(this, 'InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    // S3バケットからの読み取り権限を付与
    scriptBucket.grantRead(role);

    // Secrets Managerからの読み取り権限を付与
    googleApiKeySecret.grantRead(role);

    return role;
  }

  /**
   * インスタンス起動時に実行するスクリプトを設定する
   */
  private configureUserData(instance: ec2.Instance, scriptBucket: s3.Bucket): void {
    // 環境変数を設定
    const mysqlUser = process.env.MYSQL_USER || 'noder';
    const mysqlPassword = process.env.MYSQL_PASSWORD || 'secret';
    const mysqlDb = process.env.MYSQL_DB || 'dev_neko';

    instance.userData.addCommands(
      'yum update -y',
      'yum install -y aws-cli',
      
      // 環境変数をエクスポート
      `export MYSQL_USER=${mysqlUser}`,
      `export MYSQL_PASSWORD=${mysqlPassword}`,
      `export MYSQL_DB=${mysqlDb}`,
      
      // S3からセットアップスクリプトをダウンロード
      'mkdir -p /tmp/setup_script',
      `aws s3 sync s3://${scriptBucket.bucketName}/ /tmp/setup_script/`,
      'chmod +x /tmp/setup_script/user-data.sh',
      
      // スクリプトを実行
      '/tmp/setup_script/user-data.sh'
    );
  }

  /**
   * Route 53のHosted ZoneとAレコードを設定する
   */
  private setupRoute53(instance: ec2.Instance): route53.IHostedZone {
    // 既存のHosted Zoneを取得
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'arctic-street.net',
    });

    // dev-neko.arctic-street.netのAレコードを作成
    new route53.ARecord(this, 'DevNekoARecord', {
      zone: hostedZone,
      recordName: 'dev-neko',
      target: route53.RecordTarget.fromIpAddresses(instance.instancePublicIp),
      ttl: cdk.Duration.minutes(5),
    });

    return hostedZone;
  }

  /**
   * CloudFormationのアウトプットを定義する
   */
  private defineOutputs(instance: ec2.Instance, instanceName: string, sgName: string, hostedZone: route53.IHostedZone): void {
    // 出力
    new cdk.CfnOutput(this, 'InstanceId', {
      value: instance.instanceId,
      description: 'EC2 Instance ID',
    });

    new cdk.CfnOutput(this, 'InstancePublicDnsName', {
      value: instance.instancePublicDnsName,
      description: 'EC2 Instance Public DNS Name',
    });

    new cdk.CfnOutput(this, 'InstancePublicIp', {
      value: instance.instancePublicIp,
      description: 'EC2 Instance Public IP',
    });
    
    new cdk.CfnOutput(this, 'InstanceName', {
      value: instanceName,
      description: 'EC2 Instance Name',
    });
    
    new cdk.CfnOutput(this, 'SecurityGroupName', {
      value: sgName,
      description: 'Security Group Name',
    });
    
    new cdk.CfnOutput(this, 'DomainName', {
      value: 'dev-neko.arctic-street.net',
      description: 'Domain Name',
    });
    
    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: hostedZone.hostedZoneId,
      description: 'Hosted Zone ID',
    });
  }
}
