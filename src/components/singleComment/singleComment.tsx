import Votes from "../../features/votes/votes";
import Avatar from "../avatar/avatar";

interface SingleComment {
  votes: any;
  author: any;
  id: any;
  body: any;
}

const SingleComment: React.FC<SingleComment> = (props: SingleComment) => {
  return (
    <div className="c-comment">
      <div className="c-quote__element">
        <div>
          <Votes votesNumber={props.votes} quoteId={props.id} />
        </div>
        <div style={{ width: "100%", paddingLeft: "20px" }}>
          <div className="c-quote__header">
            <div className="c-quote__header-details">
              <Avatar></Avatar>
              <p className="author">{props.author}</p>
            </div>
            <div>
              <button className="delete">
                <span className="icon-delete"></span>
                Delete
              </button>
              <button className="reply">
                <span className="icon-reply"></span>
                Reply
              </button>
            </div>
          </div>
          <p className="quote-text" style={{ marginTop: "0" }}>
            {props.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
