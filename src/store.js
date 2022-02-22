import { makeAutoObservable } from "mobx";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebase-config";

class Store {
  quotesList = [];
  commentsList = [];
  showAddQuote = false;
  newAuthor = "";
  newQuoteText = "";
  inputHashtag = "";
  newHashtags = [];
  isKeyReleased = false;
  showDeleteDialog = false;
  quoteCollectionRef = collection(db, "quotes");
  selectedQuote = "";

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

  setInputHashtag(inputHashtag) {
    this.inputHashtag = inputHashtag;
  }

  setIsKeyReleased(isKeyReleased) {
    this.isKeyReleased = isKeyReleased;
  }

  setShowDeleteDialog(showDeleteDialog) {
    this.showDeleteDialog = showDeleteDialog;
  }

  setSelectedQuote(selectedQuote) {
    this.selectedQuote = selectedQuote;
  }

  getQuotesList = async () => {
    const data = await getDocs(this.quoteCollectionRef);
    const quotesData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    this.setQuotesList(quotesData);
  };

  onKeyUp = () => {
    this.setIsKeyReleased(true);
  };

  toggleDeleteDialog = () => {
    this.showDeleteDialog = !this.showDeleteDialog;
  };
}

const store = new Store();

export default store;
