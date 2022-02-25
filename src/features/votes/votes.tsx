import { strictEqual } from "assert";
import { updateDoc, doc } from "firebase/firestore";
import { toJS } from "mobx";
import { db } from "../../firebase-config";
import store from "../../store";

interface IMyProps {
  votesNumber: number;
  quoteId: string;
}

const Votes: React.FC<IMyProps> = (props: IMyProps) => {
  let voteValue: any = props.votesNumber;
  store.setVotesNumber(voteValue);

  const updateLikes = async (id: string, likes: number) => {
    const likesDoc: any = doc(db, "quotes", id);
    const newFields = { likes: likes };

    await updateDoc(likesDoc, newFields);
  };

  const upVote = () => {
    // if (props.quoteId) {
    store.setClickedUpVote(true);
    store.setVotesNumber(props.votesNumber + 1);
    voteValue = store.votesNumber;
    console.log(store.votesNumber);
    updateLikes(props.quoteId, voteValue);
    store.userAction.push({
      id: props.quoteId,
      likes: voteValue,
      upvote: store.clickedUpVote,
      downvote: false,
    });
    console.log(toJS(store.userAction));
    store.getQuotesList();

    if (props.quoteId && store.clickedUpVote) {
      console.log("here should be disabled");
      store.setDisabled(true);
    }

    // }
  };

  const downVote = () => {
    store.setClickedDownVote(true);
    store.setVotesNumber(props.votesNumber - 1);
    voteValue = store.votesNumber;
    updateLikes(props.quoteId, voteValue);
    store.userAction.push({
      id: props.quoteId,
      likes: voteValue,
      upvote: false,
      downvote: store.clickedDownVote,
    });

    console.log(toJS(store.userAction));
    store.getQuotesList();
  };

  return (
    <div className="votes__container">
      <button
        disabled={store.clickedUpVote}
        onClick={upVote}
        className="votes__btn"
      >
        +
      </button>
      <span className="votes__value">{store.votesNumber}</span>
      <button
        disabled={store.clickedDownVote}
        onClick={downVote}
        className="votes__btn"
      >
        -
      </button>
    </div>
  );
};

export default Votes;
