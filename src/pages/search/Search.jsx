import React, { useState } from "react";

import NavBar from "../browse/NarBav";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";

const Search = () => {
  const [inputData, setInputData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const inputFormHandler = (input) => {
    setInputData(input);
    setShowResult(true);
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm inputForm={inputFormHandler} />
      {showResult && <ResultList inputResult={inputData} />}
    </div>
  );
};

export default Search;
