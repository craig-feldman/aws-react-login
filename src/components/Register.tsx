import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import userPool from "../aws/UserPool";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Register = () => {
  const { register, watch, handleSubmit, errors } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onSubmit = handleSubmit((values) => {
    // Associate User with the provided name
    const attributeName = new CognitoUserAttribute({
      Name: "name",
      Value: values.name,
    });

    userPool.signUp(
      values.email,
      values.password,
      [attributeName],
      [],
      (err, result) => {
        if (err) {
          console.error(err);
          setErrorMessage(err.message);
        } else {
          // Navigate to login screen on success
          console.log(result);
          history.push("/login");
        }
      }
    );
  });

  return (
    <div>
      <p>
        Welcome to this sample application <br /> Register by completing below.
      </p>

      <form onSubmit={onSubmit} className="form">
        <input
          name="name"
          placeholder="name"
          ref={register({ required: "Required" })}
        />
        {errors.name && errors.name.message}

        <input
          name="email"
          placeholder="email"
          type="email"
          ref={register({ required: "Required" })}
        />
        {errors.email && errors.email.message}

        <input
          name="password"
          placeholder="password"
          type="password"
          ref={register({
            required: "Required",
            minLength: {
              value: 6,
              message: "Password must be longer than 6 characters",
            },
          })}
        />
        {errors.password && errors.password.message}

        <input
          name="passwordConfirmation"
          placeholder="password confirmation"
          type="password"
          ref={register({
            validate: (value) => {
              return value === watch("password");
            },
          })}
        />
        {errors.passwordConfirmation && "Passwords do not match"}

        <button type="submit">Register</button>

        {errorMessage}
      </form>
    </div>
  );
};

export default Register;
