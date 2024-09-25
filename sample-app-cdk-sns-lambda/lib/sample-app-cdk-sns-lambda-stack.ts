import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

export class SampleAppCdkSnsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dlqLambda = new NodejsFunction(this, 'dlq-lambda', {
      memorySize: 256,
      timeout: Duration.seconds(5),
      handler: 'main',
      entry: "./lambda/dlq_lambda.ts",
      runtime: Runtime.NODEJS_LATEST,
    });

    const deadLetterQueue = new Queue(this, "dead-letter-queue", {
      retentionPeriod: Duration.minutes(30),
    });

    dlqLambda.addEventSource(new SqsEventSource(deadLetterQueue));

    const queue = new Queue(this, "sqs-queue", {
      deadLetterQueue: {
        queue: deadLetterQueue,
        maxReceiveCount: 1,
      },
    });

    const topic = new Topic(this, "sns-topic");

    topic.addSubscription(new SqsSubscription(queue));

    new CfnOutput(this, "snsTopicArn", {
      value: topic.topicArn,
      description: "The arn of the SNS topic",
    });

    const lambda = new NodejsFunction(this, "my-lambda", {
      memorySize: 256,
      timeout: Duration.seconds(5),
      entry: "./lambda/my_lambda.ts",
      handler: "main",
      runtime: Runtime.NODEJS_LATEST,
    });

    lambda.addEventSource(
      new SqsEventSource(queue, {
        batchSize: 10,
      })
    );
  }
}
