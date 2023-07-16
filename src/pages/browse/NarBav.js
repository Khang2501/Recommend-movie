import React, { useState } from "react";
import classes from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();

  const [background, setBackground] = useState(classes.navbar);

  const changeBackground = () => {
    if (window.scrollY >= 120) {
      setBackground(`${classes["navbar"]} ${classes["background"]}`);
    } else {
      setBackground(classes.navbar);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <div className={background}>
      <ul className={classes["navbar_ul"]}>
        <li
          className={classes["navbar_home"]}
          onClick={() => {
            navigate("/");
          }}
        >
          Movie App
        </li>
        <li
          className={classes["navbar_search"]}
          onClick={() => {
            navigate("/search");
          }}
        >
          <FaSearch />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
