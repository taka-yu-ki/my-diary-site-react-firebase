import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div>
      <button className="authentication" onClick={signInWithGoogle}>
        Googleでサインイン
      </button>
    </div>
  );
};

export default SignIn;
