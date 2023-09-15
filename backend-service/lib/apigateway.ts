import {Construct} from "constructs";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
export interface APIGatewayProps {
    startGameSessionLambda: lambda.IFunction,
}
export class ApiGateway extends Construct {

    constructor(scope: Construct, id: string, props: APIGatewayProps) {
        super(scope, id);
        const stageName = 'dev';
        let domainNameOptions : apigateway.DomainNameOptions | undefined;
        const gameLiftAPI = new apigateway.RestApi(this, 'GameLiftAPI', {
            restApiName: 'test-GLWorkshop-GameLiftAPI',
            domainName: domainNameOptions,
            retainDeployments: false,
            deploy: true,
            deployOptions: {
                stageName: stageName,
                cacheClusterEnabled: true,
                cacheClusterSize: '0.5',
                cacheTtl: cdk.Duration.minutes(1),
                throttlingBurstLimit: 100,
                throttlingRateLimit: 1000
            },
            endpointTypes: [
                apigateway.EndpointType.EDGE
            ],
        });
        new cdk.CfnOutput(scope, 'InvokeUrl', { value: gameLiftAPI.url })

        // 创建 API Key
        const apiKey = new apigateway.ApiKey(this, 'GameLiftAPIKEY', {
            apiKeyName: 'Game Lift API Key',
            enabled: true,
            description: 'test api key'
        });
        const matchmakingRootPath = gameLiftAPI.root.addResource('matchmaking', {
            defaultMethodOptions: {
                apiKeyRequired: true
            }
        });
        matchmakingRootPath.addMethod('POST', new apigateway.LambdaIntegration(props.startGameSessionLambda));

        const usagePlan = gameLiftAPI.addUsagePlan('ZJAPIKeyUsagePlan', {
            name: 'SuJie-GLWorkshop-UsagePlan',
            throttle: {
                burstLimit: 10,
                rateLimit: 100
            },
            quota: {
                limit: 1000,
                offset: 0,
                period: apigateway.Period.DAY
            },
            apiStages: [
                {
                    api: gameLiftAPI,
                    stage: gameLiftAPI.deploymentStage,
                }
            ]
        });
        usagePlan.addApiKey(apiKey)
    }

}