# AWS CDK EC2インスタンス作成サンプル

このプロジェクトは、AWS CDKを使用してEC2インスタンスをデプロイするシンプルなコードです。
学習を目的とした構成になっています。

## 注意事項

このサンプルコードでは、セキュリティを考慮して本番環境での使用は推奨しません。
学習用途を想定しています。

## 前提条件

### AWS側

- AWSアカウント作成済み
- AWS CLI用のユーザーを作成済み
- EC2にSSH接続するためのSSHキーペアをAWSマネジメントコンソールから作成済み

### ローカル側

- Node.jsがインストール済み
- AWS CLIがインストール済み
- AWS CLIのプロフィールが設定済み
- AWS CDK CLIを使用 

## 使用方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. CDKの初期化（初回のみ）

```bash
npx cdk bootstrap
```

このbootstrapで作成されるAWS側のリソース

ロールが複数
ECRのリポジトリ1つ
S3のバケット1つ

### 3. デプロイの実行

```bash
npx cdk deploy
または
npx cdk deploy --profile (使用するプロフィール)
```

### 4. リソースの削除

```bash
npx cdk destroy
または
npx cdk destroy --profile (使用するプロフィール)
```

## 環境変数

以下の環境変数を設定することで、デプロイ設定をカスタマイズできます：

- `CDK_DEFAULT_ACCOUNT` - AWSアカウントID
- `CDK_DEFAULT_REGION` - デプロイ先リージョン（デフォルト: ap-northeast-1）
- `KEY_PAIR_NAME` - 使用するキーペア名
- `VPC_ID` - 既存のVPC IDを使用する場合（オプション）

## デプロイシナリオ

### AWS CDKを使用したサーバーの構築

1. EC2インスタンスを作成
1. Node.js、MySQL、Apache（リバースプロキシ用）をインストール
1. `npm install -g pm2` を実行し、Next.jsのプロセス管理ができるようにする
1. Gitを使ってソースコードをclone
1. 必要な環境変数を設定（APIキーなどはAWS SecretManagerを使う）
1. `npm ci --production` 、 `npm run build` を実行
1. `pm2 start npm --name "nextjs-app" -- start` を実行（ecosystem.config.tsを作成して読み込むこともできる） 

削除できるなら削除する

### 既に動いているサーバーでソースコードを更新したい場合

1. ソースコードをpull
1. `npm ci --production` 、 `npm run build` を実行
1. `pm2 reload nextjs-app --wait-ready` を実行 


## 学習内容

### 1. 基本形

binとstackに分ける。

```plain
iac/
├── bin/
│   └── app.ts 
├── lib/
│   └── ec2-stack.ts
├── cdk.json
├── package.json
└── tsconfig.json
```

stackの中に色々記述するのが一般的

#### 1-1. stackの中身

基本的に `aws-cdk-lib/aws-ec2` の `ec2.Instance` を `new` すればよい。
ただし、そのために必要な情報として以下がある。

* VPCの情報
* 専用のセキュリティグループ
* AMI（主にOSを指定する用だけど、ここは予め作成したカスタムAMIでも可）
* インスタンス起動時に実行するスクリプト

特に最後の「インスタンス起動時に実行するスクリプト」で、サーバー内設定を全部やってしまう。逆に言うとそれ以外はAWSコンポーネントに対する操作となる。

#### 1-2. 処理の切り分け（同一ファイル内）

stackは `cdk.Stack` クラスを継承したクラスなので、オブジェクトのprivateメソッドとしてクラス内に切り出してやれば良い。
コンストラクタで、切り出した全てのprivateメソッドを呼び出せば良い。

### 2. サーバー内設定

#### 2-1. Webサーバーなどの設定ファイル

httpd.conf等は別ファイルに切り出しておいてS3にアップロード、その後立てたEC2サーバー内でS3からコピーしてくるようなスクリプトを組む。
以下のライブラリが必要。

```
npm install @aws-cdk/aws-s3-deployment
npm install -D @types/aws-cdk__aws-s3-deployment # TypeScriptの場合
```

また、EC2インスタンスに付与するロールの作成も必要になる。

以下のようなファイル構成になる

```
iac/
├── bin/
│   └── app.ts
├── lib/
│   └── ec2-stack.ts
├── apache-config/
│   └── my-site.conf
├── cdk.json
├── package.json
└── tsconfig.json
```

#### 2-2. パスワードなどの認証情報

aws-secretsmanagerを使えば自動で作成してくれて、AWS内（Secret Manager）に保存されて、EC2内から呼び出せるようになっている。
ただし、呼び出しは微課金。
ライブラリのインポートは以下。

```
npm install @aws-cdk/aws-secretsmanager
npm install -D @types/aws-cdk__aws-secretsmanager # TypeScriptの場合
```

#### 2-3. スクリプトの切り出し

サーバー内で実行するスクリプトは長くなりがちなので、シェルスクリプトにして別ファイルに切り出して、設定ファイルと同様にS3へのアップロード→EC2内でDLとして実行すれば良い。

```
iac/
├── bin/
│   └── app.ts
├── lib/
│   └── ec2-stack.ts
├── apache-config/
│   └── my-site.conf
├── user-data-scripts/              <-- この新しいフォルダを作成
│   └── install-apache.sh           <-- この新しいファイルを作成
├── cdk.json
├── package.json
└── tsconfig.json
```

### 3. ソースコードの分離

#### 3-1. stackファイルの中身をコンストラクトに分割

stackファイルの中が膨れ上がってきた場合、中身を「コンストラクト」というものに分解してソースコードを移すことができる。

```
iac/
├── bin/
│   └── app.ts
├── lib/
│   ├── ec2-stack.ts  <-- メインのスタックファイル
│   └── constructs/   <-- 新しく作成するディレクトリ
│       ├── vpc-network.ts
│       └── web-server-instance.ts
├── apache-config/
│   └── my-site.conf
├── user-data-scripts/
│   └── install-apache.sh
├── cdk.json
├── package.json
└── tsconfig.json
```

各コンストラクトは `Construct` クラスを継承したものになる。stackファイルの中ではそのコンストラクトを `new` すれば良い。

#### 3-2. stackファイルそのものを複数作成

土台となるネットワーク部分、データベースサーバー部分、アプリケーションサーバー部分というような粒度でstackファイルを分けることができる。

```
iac/
├── bin/
│   └── app.ts
├── lib/
│   ├── network-stack.ts        <-- 新しいスタック1
│   ├── web-server-stack.ts     <-- 新しいスタック2
│   └── constructs/
│       ├── vpc-network.ts
│       ├── web-server-instance.ts
│       ├── apache-config-deployment.ts
│       └── user-passwords.ts
├── apache-config/
│   └── my-site.conf
├── user-data-scripts/
│   └── install-apache.sh
├── cdk.json
├── package.json
└── tsconfig.json
```

この場合、bin/app.tsでそれぞれ `New` することで統合する。
また、土台となるネットワーク部分は様々なスタックの依存先となりうるので、依存関係を設定しておくことができる。
このことにより、「ネットワーク部分は変更する必要が無く、アプリケーションサーバー部分だけ変更したい」というような操作が可能になる。

```
cdk deploy MyNetworkStack
cdk deploy MyWebServerStack
...
```

