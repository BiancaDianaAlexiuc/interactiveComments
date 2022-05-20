import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import Avatar from "../../components/avatar/avatar";

import store from "../../store";
import { v4 as uuidv4 } from "uuid";
import db from "../../firebase-config";

interface AddComment {
  id: string;
}

const AddComment: React.FC<AddComment> = (props: AddComment) => {
  const handleCommentChange = (event: any) => {
    store.setCommentText(event.target.value);
  };

  const handleAddComment = async (id: any) => {
    const ref: any = doc(db, "quotes", id);

    await updateDoc(ref, {
      comment: arrayUnion({
        id: uuidv4(),
        author: "Bianca",
        body: store.commentText,
        created: Timestamp.fromDate(new Date()),
        updated: Timestamp.fromDate(new Date()),
        votes: 0,
      }),
    });

  };

  return (
    <div className="add-comment__container">
      <Avatar />
      <textarea
        onChange={handleCommentChange}
        className="add-comment__field"
      ></textarea>
      <button
        onClick={() => handleAddComment(props.id)}
        onKeyDown={(e: any) => {
          if (e === "Enter") {
            handleAddComment(props.id);
          }
        }}
        className="add-comment__btn"
      >
        Reply
      </button>
    </div>
  );
};

export default AddComment;
