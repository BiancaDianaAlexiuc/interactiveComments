import { observer } from "mobx-react";
import AddQuote from "../../features/add-quote/addQuote";
import store from "../../store";

const Header = () => {
  const showAddQuote = () => {
    store.showAddQuote = !store.showAddQuote;
  };

  return (
    <>
      <header className="header">
        <button onClick={showAddQuote} className="header__btn">
          Add quote
        </button>
      </header>
      <div>{store.showAddQuote && <AddQuote />}</div>
    </>
  );
};

export default observer(Header);
