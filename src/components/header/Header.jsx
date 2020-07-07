import React, { useContext } from "react";
import { RakutenContext } from "../../context/rakuten.context";

const Header = () => {
  const { state } = useContext(RakutenContext);

  return <div>{state.currentSection}</div>;
};

export default Header;
