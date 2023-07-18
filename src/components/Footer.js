import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="copyright">© 2023 muranakatakayuki</p>
      <ul>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link>サイトマップ</Link>
        </li>
        <li>
          <Link>プライバシーポリシー</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
