import React from "react";
import { auth } from "../firebase";

const SignOut = () => {
  return (
    <button className="authentication" onClick={() => auth.signOut()}>
      サインアウト
    </button>
  );
};

export default SignOut;
