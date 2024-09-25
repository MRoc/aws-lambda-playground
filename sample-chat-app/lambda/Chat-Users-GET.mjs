import {CognitoIdentityProviderClient, paginateListUsers} from '@aws-sdk/client-cognito-identity-provider';

const cognito = new CognitoIdentityProviderClient({});

export const handler = async function () {
    const paginator = paginateListUsers({client: cognito}, {
        UserPoolId: 'eu-central-1_CW2geC4LE',
        AttributesToGet: [],
        Filter: '',
        Limit: 60
    });

    let logins = [];

    for await (const page of paginator) {
        for (const user of page.Users) {
            logins.push(user.Username);
        }
    }

    return logins;
};
