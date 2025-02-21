import React from "react";

const NavbarLinkButton = ({ onButtonClick, text }) => (
  <button onClick={onButtonClick}>{text}</button>
);

export default NavbarLinkButton;
