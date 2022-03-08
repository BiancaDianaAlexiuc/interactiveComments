import { useState } from "react";
import store from "../../store";

const Search = () => {
  return (
    <div className="search__container">
      <input
        placeholder="Search using keywords"
        type="text"
        className="search__input"
        value={store.searchQuery}
        onChange={store.filterQuote}
      />
      <button className="search__button"></button>
    </div>
  );
};

export default Search;
