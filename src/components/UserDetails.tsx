import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import React from "react";
import { useHistory } from "react-router-dom";
import userPool from "../aws/UserPool";

type UserDetailsProps = {
  session: CognitoUserSession;
};

const UserDetails = (props: UserDetailsProps) => {
  const history = useHistory();
  const payload = props.session.getIdToken().payload;
  console.log("Payload", { payload });

  const user = new CognitoUser({
    Username: payload.email,
    Pool: userPool,
  });

  return (
    <div>
      <p>
        Thank you <br /> Your details are below.
      </p>

      <dl>
        <dt>Name:</dt>
        <dd>{payload.name}</dd>
        <dt>Email:</dt>
        <dd>{payload.email}</dd>
        <dt>Password:</dt>
        <dd>NA</dd>
      </dl>

      <button
        onClick={(event) => {
          user.signOut();
          history.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserDetails;
