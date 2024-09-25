import { APIGatewayEvent, Context, Handler } from 'aws-lambda';

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Success",
        }),
    };
};