import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { observer } from "mobx-react";
import { useState } from "react";
import Votes from "../../../components/votes/votes";
import db from "../../../firebase-config";
import store from "../../../store";
import Avatar from "../../../components/avatar/avatar";
import DeleteDialog from "../../../components/deleteDialog/deleteDialog";
import { v4 as uuidv4 } from "uuid";
import { toJS } from "mobx";
import AddComment from "../addComment/addComment";
import { ISingleComment } from "../../../models/types";

const SingleComment: React.FC<ISingleComment> = (props: ISingleComment) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleReply, setToggleReply] = useState(false);

  const togglerEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleEditClick = (id: string) => {
    togglerEdit.call(id);
  };

  const togglerReply = () => {
    setToggleReply((prev) => !prev);
  };

  const handleReplyClick = (id: string) => {
    togglerReply.call(id);
  };

  const updateComment = (obj: any, body: string) => {
    console.log("updated");
    let docId = obj.uid;
    const ref: any = doc(db, "comments", docId);
    const newFields = { body: body };

    console.log("update", toJS(obj), docId);
    onSnapshot(doc(db, "comments", docId), async (doc) => {
      await updateDoc(ref, newFields);
    });

    store.getComments(docId);
    setToggleEdit(false);
  };

  return (
    <div className="single-comment">
      <div className="quotes__element">
        <div>
          <Votes
            selected={"comment"}
            votesNumber={props.votes}
            quoteId={props.commentId}
          />
        </div>
        <div style={{ width: "100%", paddingLeft: "20px" }}>
          <div className="quotes__header">
            <div className="quotes__header-details">
              <Avatar></Avatar>
              <p className="author">{props.author}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  store.toggleDeleteDialog();
                  store.setSelectedItem("comment");
                  store.setSelectedComment(props.comments);
                }}
                className="delete"
              >
                <span className="icon-delete"></span>
                Delete
              </button>
              <button
                onClick={() => handleReplyClick(props.comments.id)}
                className="reply"
              >
                <span className="icon-reply"></span>
                Reply
              </button>
              <button
                onClick={() => handleEditClick(props.comments.id)}
                className="edit"
              >
                <span className="icon-edit"></span>
                Edit
              </button>
            </div>
          </div>

          {toggleEdit ? (
            <div className="comment-update">
              <input
                className="comment-update__field"
                type="text"
                defaultValue={props.body}
                onChange={(e) => {
                  store.setUpdatedCommentValue(e.target.value);
                }}
              />
              <button
                onClick={() =>
                  updateComment(props.comments, store.updatedCommentValue)
                }
                className="comment-update__btn"
              >
                Update
              </button>
            </div>
          ) : (
            // <UpdateComment value={props.body} id={props.comments.id} selectedCommentObj={toJS(props.comments)} /> :
            <p className="quote-text" style={{ marginTop: "0" }}>
              {props.body}
            </p>
          )}

          {toggleReply && <AddComment id={uuidv4()} selected={"comment"} />}
        </div>
      </div>

      {store.showDeleteDialog && <DeleteDialog />}
    </div>
  );
};

export default observer(SingleComment);
