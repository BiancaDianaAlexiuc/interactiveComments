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
  votesNumber = [];
  userAction = [];
  disabled = false;
  //value of search field
  searchQuery = "";
  // the search result
  foundQuery = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFoundQuery(foundQuery) {
    this.foundQuery = foundQuery;
  }

  setSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
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

  setVotesNumber(votesNumber) {
    this.votesNumber = votesNumber;
  }

  setUserAction(userAction) {
    this.userAction = userAction;
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

  filterQuote = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = this.quotesList.filter((qt) => {
        return qt.body.toLowerCase().includes(keyword.toLowerCase());
      });
      this.setFoundQuery(results);
    } else {
      this.setFoundQuery(this.quotesList);
    }

    this.setSearchQuery(keyword);
  };
}

const store = new Store();

export default store;
