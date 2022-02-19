import { makeAutoObservable } from "mobx";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebase-config";

class Store {
  quotesList = [];
  commentsList = [];
  showAddQuote = false;
  newAuthor = "";
  newQuoteText = "";
  newHashtags = [];
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

  setNewAuthor(newAuthor) {
    this.newAuthor = newAuthor;
  }

  setNewQuoteText(newQuoteText) {
    this.newQuoteText = newQuoteText;
  }

  setNewHashtags(newHashtags) {
    this.newHashtags = newHashtags;
  }

  getQuotesList = async () => {
    const data = await getDocs(this.quoteCollectionRef);
    const quotesData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    this.setQuotesList(quotesData);
  };
}

const store = new Store();

export default store;
