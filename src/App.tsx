import "./App.scss";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Quote from "./features/quote/quote";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Quote />
      <Footer />
    </div>
  );
};

export default App;
