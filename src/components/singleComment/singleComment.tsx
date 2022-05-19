import { arrayRemove, arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { observer } from "mobx-react";
import { useState } from "react";
import Votes from "../../features/votes/votes";
import db from "../../firebase-config";
import store from "../../store";
import Avatar from "../avatar/avatar";
import DeleteDialog from "../deleteDialog/deleteDialog";
import { v4 as uuidv4 } from "uuid";

interface SingleComment {
  votes: any;
  author: any;
  commentId: any;
  body: any;
  comments: any;
}

const SingleComment: React.FC<SingleComment> = (props: SingleComment) => {
 const [toggleEdit, setToggleEdit] = useState(false);

  const togglerEdit = () => {
    setToggleEdit(prev => !prev);
  }

  const handleEditClick = (id: string) => {
    togglerEdit.call(id);
  }

     const  updateComment  = async (obj: Object) => {
       console.log("updated");
       let docId = store.selectedQuote;
       const ref: any = doc(db, "quotes", docId);

       await updateDoc(ref, {
           comment: arrayRemove(obj)
       });

       await updateDoc(ref, {
           comment:  arrayUnion({
            id: uuidv4(),
            author: "Bianca",
            body: store.updatedCommentValue,
            created: Timestamp.fromDate(new Date()),
            updated: Timestamp.fromDate(new Date()),
            votes: 0,
           })
       })

       setToggleEdit(false);

    //    const lastElement = store.commentObject[store.commentObject.length -1];

    //    console.log("comm obj before push", toJS(store.commentObject))
    //    store.commentObject.splice(0, lastElement);
    //      console.log("comm obj after push", toJS(store.commentObject))


    }
  
  return (
    <div className="c-comment">
      <div className="c-quote__element">
        <div>
          <Votes selected={'comment'} votesNumber={props.votes} quoteId={props.commentId} />
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
                  store.setSelectedItem("comment");
                  store.setSelectedComment(props.comments);
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
                <button onClick={() => handleEditClick(props.comments.id)}  className="edit">
                <span className="icon-edit"></span>
                Edit
              </button>
            </div>
          </div>


          { toggleEdit ? 

           <div className="c-comment-update">
            <input className="c-comment-update__field" type="text" defaultValue={props.body} onChange={(e) => {store.setUpdatedCommentValue(e.target.value)}} />
            <button onClick={() => updateComment(props.comments)} className="c-comment-update__btn">Update</button>
          </div> :
         // <UpdateComment value={props.body} id={props.comments.id} selectedCommentObj={toJS(props.comments)} /> :  
           <p className="quote-text" style={{ marginTop: "0" }}>
            {props.body}
          </p> }
          
  
        </div>
      </div>

      {store.showDeleteDialog && <DeleteDialog />}
    </div>
  );
};

export default observer(SingleComment);
