import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Construct } from "constructs";

export class SampleAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new Queue(this, "SampleAppQueue", {
      visibilityTimeout: Duration.seconds(300),
    });

    const lambda = new NodejsFunction(this, "SampleFunction", {
      entry: "./lambda/lambda_handler.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_LATEST,
    });

    const eventSource = new SqsEventSource(queue);
    lambda.addEventSource(eventSource);
  }
}
