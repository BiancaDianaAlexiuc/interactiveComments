import "./App.scss";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Quote from "./features/quote/quote";
import Search from "./features/search/search";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Search />
      <Quote />
      <Footer />
    </div>
  );
};

export default App;
