import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { toJS } from "mobx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../../../components/avatar/avatar";
import Votes from "../../../components/votes/votes";
import db from "../../../firebase-config";
import { ISingleQuote } from "../../../models/types";
import store from "../../../store";
import AddComment from "../../comments/addComment/addComment";

const SingleQuote: React.FC<ISingleQuote> = ({
  selected,
  votesNumber,
  quoteId,
  author,
  body,
  handleDeleteClick,
  handleShowComments,
  hashtags,
  created,
  updated,
  comments,
}) => {
  const [isToggle, setIsToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const toggleReply = () => {
    setIsToggle((prev) => !prev);
  };

  const togglerEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleEditClick = (id: string) => {
    togglerEdit.call(id);
    console.log(id, toggleEdit);
  };

  const handleReplyClick = (id: any) => {
    toggleReply.call(id);
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
    <div style={{ width: "inherit" }}>
      <div className="single-quote">
        <div>
          <Votes
            selected={selected}
            votesNumber={votesNumber}
            quoteId={quoteId}
          />
        </div>
        <div style={{ width: "100%", paddingLeft: "20px" }}>
          <div className="single-quote__header">
            <div className="single-quote__header-details">
              <Avatar></Avatar>
              <p className="author">{author}</p>
            </div>
            <div>
              <button
                onClick={() => handleDeleteClick(quoteId)}
                className="delete"
              >
                <span className="icon-delete"></span>
                Delete
              </button>
              <button
                onClick={() => handleReplyClick(quoteId)}
                className="reply"
              >
                <span className="icon-reply"></span>
                Reply
              </button>
              {selected === "comment" && (
                <button
                  onClick={() => handleEditClick(quoteId)}
                  className="edit"
                >
                  <span className="icon-edit"></span>
                  Edit
                </button>
              )}
            </div>
          </div>

          {toggleEdit ? (
            <div className="comment-update">
              <input
                className="comment-update__field"
                type="text"
                defaultValue={body}
                onChange={(e) => {
                  store.setUpdatedCommentValue(e.target.value);
                }}
              />
              <button
                onClick={() =>
                  updateComment(comments, store.updatedCommentValue)
                }
                className="comment-update__btn"
              >
                Update
              </button>
            </div>
          ) : (
            <p
              onClick={() => handleShowComments(quoteId)}
              className="quote-text"
              style={{ marginTop: "0" }}
            >
              {body}
            </p>
          )}

          {selected === "quote" && (
            <div>
              <ul className="hashtag-list">
                {hashtags.map((hashtag: string) => {
                  return (
                    <li key={uuidv4()} className="hashtag">
                      #{hashtag}
                    </li>
                  );
                })}
              </ul>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="created">Created at: {created} </p>
                <p className="updated">Updated at: {updated}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isToggle && <AddComment selected="quote" id={quoteId} />}
    </div>
  );
};

export default SingleQuote;
