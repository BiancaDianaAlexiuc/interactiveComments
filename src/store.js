import { makeAutoObservable } from "mobx";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebase-config";

class Store {
  quotesList = [];
  commentsList = [];
  quoteCollectionRef = collection(db, "quotes");

  constructor() {
    makeAutoObservable(this);
  }

  setQuotesList(quotesList) {
    this.quotesList = quotesList;
  }

  setCommentsList(commentsList) {
    this.commentsList = commentsList;
  }

  getQuotesList = async () => {
    const data = await getDocs(this.quoteCollectionRef);
    const quotesData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    this.setQuotesList(quotesData);
  };
}

const store = new Store();

export default store;
