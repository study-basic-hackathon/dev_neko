# AWS CDK EC2インスタンス作成サンプル

このプロジェクトは、AWS CDKを使用してEC2インスタンスをデプロイするシンプルなコードです。
学習を目的とした構成になっています。

## 前提条件

- Node.js (v14.x以上)
- AWS CLI（設定済み）
- AWS CDK CLI

## 使用方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. CDKの初期化（初回のみ）

```bash
npx cdk bootstrap
```

このbootstrapで作成されるリソース

ロールが複数
ECRのリポジトリ1つ
S3のバケット1つ

### 3. デプロイの実行

```bash
npx cdk deploy
```

### 4. リソースの削除

```bash
npx cdk destroy
```

## カスタマイズ方法

`lib/ec2-stack.ts` ファイルを編集することで、以下の設定を変更できます：

- インスタンスタイプ
- AMI（Amazon Machine Image）
- セキュリティグループの設定
- ユーザーデータ（起動時に実行するスクリプト）

## 環境変数

以下の環境変数を設定することで、デプロイ設定をカスタマイズできます：

- `CDK_DEFAULT_ACCOUNT` - AWSアカウントID
- `CDK_DEFAULT_REGION` - デプロイ先リージョン（デフォルト: ap-northeast-1）
- `KEY_PAIR_NAME` - 使用するキーペア名
- `VPC_ID` - 既存のVPC IDを使用する場合（オプション）

## 注意事項

このサンプルコードでは、セキュリティを考慮して本番環境での使用は推奨しません。
学習用途を想定しています。
