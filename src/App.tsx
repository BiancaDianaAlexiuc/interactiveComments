import "./App.scss";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Quotes from "./features/quotes/quotes";
import Search from "./features/quotes/searchQuote/searchQuote";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Quotes />
      <Footer />
    </div>
  );
};

export default App;
