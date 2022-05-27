import {
  addDoc,
  collection,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Avatar from "../../../components/avatar/avatar";
import store from "../../../store";
import db from "../../../firebase-config";
import { IAddComment } from "../../../models/types";

const AddComment: React.FC<IAddComment> = (props: IAddComment) => {
  const handleCommentChange = (event: any) => {
    store.setCommentText(event.target.value);
  };

  const handleAddComment = async (id: any) => {
    const ref: any = collection(db, "comments");
    const comRef: any = doc(db, "comments", id);
    const snapshot: any = await getDocs(ref);

    if (props.selected === "quote") {
      await addDoc(ref, {
        id: id,
        author: "Bianca",
        body: store.commentText,
        created: Timestamp.fromDate(new Date()),
        updated: Timestamp.fromDate(new Date()),
        votes: 0,
        replies: {},
      });
    } else {
      console.log("comment reply to be added here");
      snapshot.docs.map((doc: any) => {
        updateDoc(comRef, {
          replies: {
            id: id,
            author: "Bianca",
            body: store.commentText,
            created: Timestamp.fromDate(new Date()),
            updated: Timestamp.fromDate(new Date()),
          },
        });
      });
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
