#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2Stack } from '../lib/ec2-stack';
import 'dotenv/config';

const app = new cdk.App();
new Ec2Stack(app, 'Ec2Stack', {
  /* 必要に応じてスタックのプロパティを指定 */
  env: { 
    account: process.env.AWS_ACCOUNT_ID,  // AWSアカウントID（環境変数から取得）
    region: process.env.AWS_REGION || 'ap-northeast-1'  // デプロイ先リージョン
  },
});
