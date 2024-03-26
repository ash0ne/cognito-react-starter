# Cognitor React Starter

- This frontend project is initiated with [Create React App](https://github.com/facebook/create-react-app)
- This frontend is designed to be fully functional as a standalone application irrespective of the backend you choose to use.

- **Setup**

  - Before using this application, it's necessary to set up an [AWS Cognito Identity Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html). This process is pretty straightforward.
  - Upon setting up the Identity Pool, make sure to replace the placeholders in `src/aws-export.js` with your Cognito Identity Pool configuration values.

  > Note: When creating the Cognito Identity Pool, ensure it is created without an App Client Secret. This is a common practice as frontend applications typically have no secure way of storing the secret. The client secret is required only in specific OAuth2.0 scenarios. Refer to [this Stack Overflow thread](https://stackoverflow.com/questions/47916034/what-is-a-cognito-app-client-secret) for more information.

## Component Structure and Overview

The project follows a structured component organization to showcase various functionalities:

- **App.js**:
  - Contains the router setup and demonstrates the configuration required for authorized and unauthorized routes.
- **Home.js**:
  - Provides a boilerplate layout for an application home page, which can be customized as needed.
- **Dashboard.js**:
  - Features a dashboard with a navbar that includes user details, an option to sign out, and two sections.
  - **Section 1**: Displays all the ID and Access token details retrieved from the Cognito Identity Pool.
  - **Section 2**: Illustrates how these tokens can be utilized to make API calls to the backend.

This structured approach allows for easy understanding and modification of the application's components and functionalities.
Read `LICENSE`
