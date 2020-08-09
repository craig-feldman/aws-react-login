import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import userPool from "../aws/UserPool";

type FormData = {
  email: string;
  password: string;
};

type LoginProps = {
  setSession: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>;
};

const Login = (props: LoginProps) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = handleSubmit((values) => {
    console.log({ values });

    const user = new CognitoUser({
      Username: values.email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: values.email,
      Password: values.password,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log("Login successful", session);
        console.log(session.getIdToken().payload);
        props.setSession(session);
        history.push("/");
      },

      onFailure: (err) => {
        console.error("Login failed", err);
        setErrorMessage(`An error occurred while logging in: ${err?.message}`);
      },
    });
  });

  // Qwerty123!@#

  return (
    <div>
      <p>
        Welcome to this sample application <br /> Login below.
      </p>

      <form onSubmit={onSubmit} className="form">
        <input name="email" placeholder="email" type="email" ref={register} />
        {errors.email && errors.email.message}

        <input name="password" type="password" ref={register} />
        {errors.password && errors.password.message}

        <button type="submit">Login</button>
      </form>
      {errorMessage}
    </div>
  );
};

export default Login;
