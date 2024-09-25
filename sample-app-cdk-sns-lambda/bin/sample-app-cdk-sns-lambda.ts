#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SampleAppCdkSnsLambdaStack } from '../lib/sample-app-cdk-sns-lambda-stack';

const app = new cdk.App();
new SampleAppCdkSnsLambdaStack(app, 'SampleAppCdkSnsLambdaStack');
