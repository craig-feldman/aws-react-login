# Register, Login, Logout flow

## About

A simple login flow built using AWS, React, TypeScript.

AWS Cognito is used for user registration and management. The project is hosted using AWS Amplify.
Project bootstrapped using Create React App. There is minimal styling applied.

The homepage shows the current logged in user details (if one exists), otherwise the user is prompted to login or register.

Base URL: <https://master.dt3wgj9e27nk8.amplifyapp.com/>

Home page - /
Login page - /login
Register page - /register

All registration fields are required.
The only password restriction is that it must be 6 or more characters.

## Usage

1. Navigate to home page and click on 'register'.
2. Fill in all registration details and click the 'register' button.
3. Once redirected to the login page, login using the email and password you provided on step 2.
4. You name and email will be displayed in a simple description list. Since we do not store a plaintext password, this cannot be displayed.
