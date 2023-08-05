import React from "react";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };
  return (
    <div>
      <button className="authentication signIn" onClick={signInWithGoogle}>
        Googleでサインイン
      </button>
    </div>
  );
};

export default SignIn;
