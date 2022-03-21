import { useState } from "react";
import store from "../../store";

const Search = () => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      store.filterQuote();
    }
  };
  return (
    <div className="search__container">
      <input
        placeholder="Search using keywords"
        type="text"
        className="search__input"
        onChange={store.handleInputChange}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <input
        type="button"
        onClick={store.filterQuote}
        className="search__button"
      ></input>
    </div>
  );
};

export default Search;
