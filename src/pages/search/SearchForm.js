import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import classes from "./SearchForm.module.scss";
const SearchForm = ({ inputForm }) => {
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const searchHandler = (event) => {
    if (enteredInput.trim() === "") return;
    inputForm(enteredInput);
  };

  const resetHandler = () => {
    setEnteredInput("");
  };

  return (
    <div className={classes["search-form"]}>
      <div className={classes["search-form_detail"]}>
        <div className={classes["search-form_input"]}>
          <input
            type="text"
            value={enteredInput}
            onChange={inputChangeHandler}
          />
          <button onClick={searchHandler}>
            <FaSearch />
          </button>
        </div>
        <div className={classes["search-form_button"]}>
          <button onClick={resetHandler}>RESET</button>
          <button onClick={searchHandler}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
