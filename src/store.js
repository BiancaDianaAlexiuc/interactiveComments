import { makeAutoObservable } from "mobx";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebase-config";
import { toJS } from "mobx";

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
  searchQuery = " ";
  // the search result
  foundQuery = [];

  // Filter by hashtags
  displayHashtags = false;
  hashtagsToFilter = [];
  selectedHashtags = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedHashtags(selectedHashtags) {
    this.selectedHashtags = selectedHashtags;
  }

  setHashtagsToFilter(hashtagsToFilter) {
    this.hashtagsToFilter = hashtagsToFilter;
  }

  setDisplayHashtags(displayHashtags) {
    this.displayHashtags = displayHashtags;
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
    const hashtagsData = quotesData.map((qt) => {
      return qt.hashtags;
    });
    this.setQuotesList(quotesData);
    this.setFoundQuery(quotesData);
    this.setHashtagsToFilter(hashtagsData.flat(1));
  };

  onKeyUp = () => {
    this.setIsKeyReleased(true);
  };

  toggleDeleteDialog = () => {
    this.showDeleteDialog = !this.showDeleteDialog;
  };

  toggleDisplayHashtags = () => {
    this.displayHashtags = !this.displayHashtags;
  };

  handleInputChange = (e) => {
    console.log(e.target.value);
    this.searchQuery = e.target.value;
  };

  filterQuote = (e) => {
    console.log(this.searchQuery);
    const keyword = this.searchQuery;
    console.log(keyword);
    const foundQuotes = this.quotesList;
    console.log(toJS(foundQuotes), "Found quotes");
    const matchWords = keyword.split(" ");
    console.log("Match words", matchWords);

    for (let i = 0; i < matchWords.length; i++) {
      if (keyword !== "") {
        const result = foundQuotes.filter((qt) => {
          return qt.body.toLowerCase().match(matchWords[i].toLowerCase());
        });
        this.setFoundQuery(result);
      } else {
        this.setFoundQuery(foundQuotes);
      }
    }
    this.setSearchQuery(keyword);
  };
}

const store = new Store();

export default store;
