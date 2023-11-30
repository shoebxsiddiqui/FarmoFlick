import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phones</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>FARMOFLICK.</h1>
        <p>High Quality is our first Priority</p>

        <p>Copyrights 2023 &copy; MeMdShuaib</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.instagram.com/">Youtube</a>
        <a href="https://www.instagram.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
