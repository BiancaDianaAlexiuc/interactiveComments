import { makeAutoObservable } from "mobx";
import { collection, getDocs, where, query } from "@firebase/firestore";
import db from "./firebase-config";

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
  quoteData = [];
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

  //Show quote comments
  showComments = false;
  commentObject = [];
  commentId = [];

  //Add new comment
  commentText = "";

  // Delete comment
  selectedItem = " ";
  selectedComment = "";

  //Update comment
  editActive = false;
  updatedCommentValue = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCommentId(commentId) {
    this.commentId = commentId;
  }

  setUpdatedCommentValue(updatedCommentValue) {
    this.updatedCommentValue = updatedCommentValue;
  }

  setEditActive(editActive) {
    this.editActive = editActive;
  }

  setSelectedComment(selectedComment) {
    this.selectedComment = selectedComment;
  }

  setSelectedItem(selectedItem) {
    this.selectedItem = selectedItem;
  }

  setQuoteData(quoteData) {
    this.quoteData = quoteData;
  }

  setCommentText(commentText) {
    this.commentText = commentText;
  }

  setCommentObject(commentObject) {
    this.commentObject = commentObject;
  }

  setShowComments(showComments) {
    this.showComments = showComments;
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

  toggleEditComment = () => {
    this.editActive = !this.editActive;
  };

  toggleDeleteComment = () => {
    this.deleteComment = !this.deleteComment;
  };

  toggleDeleteDialog = () => {
    this.showDeleteDialog = !this.showDeleteDialog;
  };

  toggleDisplayHashtags = () => {
    this.displayHashtags = !this.displayHashtags;
  };

  toggleShowComments = () => {
    this.showComments = !this.showComments;
  };

  handleInputChange = (e) => {
    this.searchQuery = e.target.value;
  };

  filterQuote = (e) => {
    const keyword = this.searchQuery;
    const foundQuotes = this.quotesList;
    const matchWords = keyword.split(" ");

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

  removeFromArray = (array, value) => {
    var idx = array.indexOf(value);
    if (idx !== -1) {
      array.splice(idx, 1);
    }
    return array;
  };

  getComments = async (id) => {
    const comments = query(collection(db, "comments"), where("id", "==", id));
    const querySnapshot = await getDocs(comments);
    const commentsObj = querySnapshot.docs.map((d) => ({
      uid: d.id,
      ...d.data(),
    }));
    console.log(commentsObj, "<<<here");
    this.setCommentObject(commentsObj);
  };
}

const store = new Store();

export default store;
