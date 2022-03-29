import { toJS } from "mobx";
import Votes from "../../features/votes/votes";
import store from "../../store";
import Avatar from "../avatar/avatar";
import DeleteDialog from "../deleteDialog/deleteDialog";

interface SingleComment {
  votes: any;
  author: any;
  id: any;
  body: any;
  comments: any;
}

const SingleComment: React.FC<SingleComment> = (props: SingleComment) => {
  console.log(toJS(props.comments));
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
              <button
                onClick={() => {
                  store.toggleDeleteDialog();
                  store.setToDelete("comment");
                }}
                className="delete"
              >
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

      {store.showDeleteDialog && <DeleteDialog />}
    </div>
  );
};

export default SingleComment;
