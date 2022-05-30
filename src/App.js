import './App.css';
import React from 'react'
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_AWS_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_USERPOOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_USERPOOL_WEB_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: `${process.env.REACT_APP_COGNITO_DOMAIN}.auth.us-east-1.amazoncognito.com`,
            scope: ['awesomeapi-resource-server/awesomeapi.read', 'openid'],
            redirectSignIn: 'http://localhost:3000/dashboard',
            redirectSignOut: 'http://localhost:3000',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

function App(props) {

  return (
    <div className="App">
      <h1>This is Landing page</h1>
      <a href={process.env.REACT_APP_COGNITO_HOSTED_UI}>Login</a>
    </div>
  );
}

export default App;
