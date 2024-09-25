# Welcome to your CDK TypeScript project

Based on https://bobbyhadz.com/blog/aws-cdk-sqs-sns-lambda

```
mkdir sample-app-cdk-sns-lambda
cd .\sample-app-cdk-sns-lambda
cdk init sample-app --language typescript 
npm i --save-dev @types/aws-lambda
npm run build
cdk bootstrap
cdk synth
cdk deploy
cdk destroy
npx aws-cdk deploy --outputs-file ./cdk-outputs.json
aws sns publish --subject "Just testing" --message "Hello world" --topic-arn "<TOPIC_ARN>"
```

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

