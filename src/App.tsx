import { collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import "./App.scss";
import { db } from "./firebase-config";

const App = () => {
  // const setQuote: string[];

  const [quote, setQuote]: [any, any] = useState([]);
  const quoteCollectionRef = collection(db, "quotes");

  useEffect(() => {
    const getQuote = async () => {
      const data = await getDocs(quoteCollectionRef);
      setQuote(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(data);
    };

    getQuote();
  }, []);

  return (
    <div className="App">
      {console.log(quote)}
      {quote.map((qt: any) => {
        return (
          <div key={qt.id}>
            <h1>{qt.author}</h1>
            <p>{qt.body}</p>
            {/* {qt.id} */}
          </div>
        );
      })}
    </div>
  );
};

export default App;
