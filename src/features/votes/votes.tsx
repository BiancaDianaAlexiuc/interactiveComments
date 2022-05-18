import { updateDoc, doc } from "firebase/firestore";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import db from "../../firebase-config";
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

  const upVote = (e: any) => {
    store.setDisabled((e.target.disabled = true));
    store.setVotesNumber(props.votesNumber + 1);

    voteValue = store.votesNumber;
    console.log(store.votesNumber);

    updateLikes(props.quoteId, voteValue);
    store.userAction.push({
      id: props.quoteId,
      likes: voteValue,
      disabled: store.disabled,
    });

    console.log(toJS(store.userAction));
    store.getQuotesList();
  };

  const downVote = (e: any) => {
    store.setDisabled((e.target.disabled = true));
    store.setVotesNumber(props.votesNumber - 1);

    voteValue = store.votesNumber;
    console.log(store.votesNumber);

    updateLikes(props.quoteId, voteValue);
    store.userAction.push({
      id: props.quoteId,
      likes: voteValue,
      disabled: store.disabled,
    });

    console.log(toJS(store.userAction));
    store.getQuotesList();
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
