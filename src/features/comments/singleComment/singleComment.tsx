import { observer } from "mobx-react";
import store from "../../../store";
import DeleteDialog from "../../../components/deleteDialog/deleteDialog";
import { ISingleComment } from "../../../models/types";
import SingleQuote from "../../quotes/singleQuote/singleQuote";

const SingleComment: React.FC<ISingleComment> = (props: ISingleComment) => {
  const handleDeleteClick = () => {
    store.toggleDeleteDialog();
    store.setSelectedItem("comment");
    store.setSelectedComment(props.comments);
  };

  return (
    <div className="single-comment">
      <SingleQuote
        selected={"comment"}
        votesNumber={props.votes}
        quoteId={props.commentId}
        author={props.author}
        body={props.body}
        handleDeleteClick={handleDeleteClick}
        handleShowComments={""}
        hashtags={[]}
        created={""}
        updated={""}
        comments={props.comments}
      />
      {store.showDeleteDialog && <DeleteDialog />}
    </div>
  );
};

export default observer(SingleComment);
