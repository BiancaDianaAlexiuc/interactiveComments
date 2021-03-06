import { updateDoc, doc } from "firebase/firestore";
import db from "../../firebase-config";
import { IVotes } from "../../models/types";
import store from "../../store";

const Votes: React.FC<IVotes> = (props: IVotes) => {
  let voteValue: any = props.votesNumber;
  store.setVotesNumber(voteValue);

  const updateLikes = async (id: string, likes: number) => {
    const likesDoc: any = doc(db, "quotes", id);
    const newFields = { likes: likes };

    await updateDoc(likesDoc, newFields);
  };

  const updateVotes = async (id: string, votes: number) => {
    const votesDoc: any = doc(db, "comments", id);
    const newFields = { votes: votes };

    await updateDoc(votesDoc, newFields);
  };

  const upVote = (e: any) => {
    store.setDisabled((e.target.disabled = true));
    store.setVotesNumber(props.votesNumber + 1);
    voteValue = store.votesNumber;

    if (props.selected === "quote") {
      updateLikes(props.quoteId, voteValue);
      store.getQuotesList();
    } else {
      updateVotes(props.quoteId, voteValue);
      store.getComments(props.quoteId);
    }

    store.setSelectedItem("");
  };

  const downVote = (e: any) => {
    store.setDisabled((e.target.disabled = true));
    store.setVotesNumber(props.votesNumber - 1);
    voteValue = store.votesNumber;

    if (props.selected === "quote") {
      updateLikes(props.quoteId, voteValue);
      store.getQuotesList();
    } else {
      updateVotes(props.quoteId, voteValue);
      store.getComments(props.quoteId);
    }
  };

  return (
    <div className="votes__container">
      <button onClick={(e: any) => upVote(e)} className="votes__btn">
        +
      </button>
      <span className="votes__value">{store.votesNumber}</span>
      <button onClick={(e: any) => downVote(e)} className="votes__btn">
        -
      </button>
    </div>
  );
};

export default Votes;
