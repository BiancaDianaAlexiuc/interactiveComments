import store from "../../../store";

const SearchQuote = () => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      store.filterQuote();
    }
  };
  return (
    <div className="search-quote">
      <input
        placeholder="Search using keywords"
        type="text"
        className="search-quote__input"
        onChange={store.handleInputChange}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <input
        type="button"
        onClick={store.filterQuote}
        className="search-quote__button"
      ></input>
    </div>
  );
};

export default SearchQuote;
