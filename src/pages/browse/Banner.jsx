import React from "react";

import classes from "./Banner.module.scss";

const Banner = ({ dataBanner }) => {
  let random;
  if (dataBanner.length !== 1) {
    random = Math.floor(Math.random() * dataBanner.length - 1);
  } else {
    random = 0;
  }

  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        src={dataBanner[random].backdropPath}
        alt="img"
      ></img>
      <div className={classes["banner_content"]}>
        <h1>
          {dataBanner[random].title === undefined
            ? "No movie name"
            : dataBanner[random].title}
        </h1>
        <button>Play</button>
        <button>My list</button>
        <p>{dataBanner[random].overView}</p>
      </div>
    </div>
  );
};

export default Banner;
