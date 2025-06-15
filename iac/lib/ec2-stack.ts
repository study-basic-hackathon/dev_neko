import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { v4 as uuidv4 } from 'uuid';

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

    // EC2インスタンスの作成
    const instance = this.createEC2Instance(vpc, securityGroup, instanceName);

    // インスタンス起動時に実行するスクリプト
    this.configureUserData(instance);

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

    return securityGroup;
  }

  /**
   * EC2インスタンスを作成する
   */
  private createEC2Instance(vpc: ec2.IVpc, securityGroup: ec2.SecurityGroup, instanceName: string): ec2.Instance {
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
    });
    
    // インスタンスに名前タグを追加
    cdk.Tags.of(instance).add('Name', instanceName);

    return instance;
  }

  /**
   * インスタンス起動時に実行するスクリプトを設定する
   */
  private configureUserData(instance: ec2.Instance): void {
    // インスタンス起動時に実行するスクリプト
    instance.userData.addCommands(
      'yum update -y',
      
      // Voltaのインストール（ec2-userとして実行）
      'sudo -u ec2-user bash -c "curl https://get.volta.sh | bash"',
      
      // ec2-userの.bashrcにVoltaのPATHを追加
      'sudo -u ec2-user bash -c "echo \'export PATH=\"\\$HOME/.volta/bin:\\$PATH\"\' >> /home/ec2-user/.bashrc"',
      
      // Node.js v22をVolta経由でインストール（直接パス指定）
      'sudo -u ec2-user /home/ec2-user/.volta/bin/volta install node@22',
      
      // MySQL 8のインストール
      'yum install -y mysql-server',
      'systemctl start mysqld',
      'systemctl enable mysqld',
      
      // Apacheのインストール
      'yum install -y httpd',
      'systemctl start httpd',
      'systemctl enable httpd',
      'echo "<html><body><h1>Hello from AWS CDK</h1><p>Node.js version: $(sudo -u ec2-user /home/ec2-user/.volta/bin/node --version)</p><p>MySQL version: $(mysqld --version)</p></body></html>" > /var/www/html/index.html'
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
