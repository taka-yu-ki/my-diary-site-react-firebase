import React from "react";
import { auth } from "../firebase";

const SignOut = () => {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
};

export default SignOut;
