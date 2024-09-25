# AWS Lambda Playground

## sample-app-ts

```
choco install awscli
npm install -g aws-cdk
```

```
mkdir sample-app-ts
cd sample-app-ts
cdk init sample-app --language typescript
npm i --save-dev @types/aws-lambda
cdk bootstrap
cdk synth
cdk diff
cdk deploy
cdk destroy
```

## chat app

https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html