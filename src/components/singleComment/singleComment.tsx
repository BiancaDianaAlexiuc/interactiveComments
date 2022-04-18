import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useState } from "react";
import Votes from "../../features/votes/votes";
import store from "../../store";
import Avatar from "../avatar/avatar";
import DeleteDialog from "../deleteDialog/deleteDialog";
import UpdateComment from "../update-comment/update-comment";

interface SingleComment {
  votes: any;
  author: any;
  id: any;
  body: any;
  comments: any;
}

const SingleComment: React.FC<SingleComment> = (props: SingleComment) => {
  const [toggleEdit, setToggleEdit] = useState(true);


  const handleEditClick = (id: any) => {
    setToggleEdit(id);
    store.toggleEditComment();
  }
  
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


          { store.editActive ? 
          <UpdateComment value={props.body} /> :  
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
