import React from "react";
import "../App.css";
import SignOut from "./SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <header className="header">
      <svg
        id="logo-72"
        width="52"
        height="44"
        viewBox="0 0 53 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo"
      >
        {" "}
        <path
          d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          className="ccustom"
          fill="#212326"
        ></path>{" "}
      </svg>
      {user && user.uid === auth.currentUser.uid && <SignOut />}
    </header>
  );
};

export default Header;
