import { addDoc, collection, Timestamp } from "firebase/firestore";
import Avatar from "../../components/avatar/avatar";
import store from "../../store";
import db from "../../firebase-config";

interface AddComment {
  id: string;
  selected: string;
}

const AddComment: React.FC<AddComment> = (props: AddComment) => {
  const handleCommentChange = (event: any) => {
    store.setCommentText(event.target.value);
  };

  const handleAddComment = async (id: any) => {
    const ref: any = collection(db, "comments");

    if (props.selected === "quote") {
      await addDoc(ref, {
        id: id,
        author: "Bianca",
        body: store.commentText,
        created: Timestamp.fromDate(new Date()),
        updated: Timestamp.fromDate(new Date()),
        votes: 0,
      });
    } else {
      console.log("comment reply to be added here");
    }
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
