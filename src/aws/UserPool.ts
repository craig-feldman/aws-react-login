import {
  ICognitoUserPoolData,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
  UserPoolId: "us-east-2_fZ27D5ZV2",
  ClientId: "2trgaisk14bno9nao15asor5v",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
