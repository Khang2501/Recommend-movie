import React from "react";

import classes from "./Banner.module.css";

const Banner = (props) => {
  let random;
  if (props.dataBanner.length !== 1) {
    random = Math.floor(Math.random() * props.dataBanner.length - 1);
  } else {
    random = 0;
  }

  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        src={props.dataBanner[random].backdropPath}
        alt="img"
      ></img>
      <div className={classes["banner_content"]}>
        <h1>
          {props.dataBanner[random].title === undefined
            ? "No movie name"
            : props.dataBanner[random].title}
        </h1>
        <button>Play</button>
        <button>My list</button>
        <p>{props.dataBanner[random].overView}</p>
      </div>
    </div>
  );
};

export default Banner;
