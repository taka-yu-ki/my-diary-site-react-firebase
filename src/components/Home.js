import React from "react";
import SignIn from "./SignIn";
import homephoto from "../images/homephoto.jpeg";

const Home = () => {
  return (
    <div>
      <div
        className="home-container"
        style={{
          backgroundImage: `url(${homephoto})`,
        }}
      >
        <h1>日記サイト</h1>
        <p>日々の記録をつけて、豊かな毎日を送ろう</p>
        <SignIn />
      </div>
    </div>
  );
};

export default Home;
