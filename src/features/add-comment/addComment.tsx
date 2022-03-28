import Avatar from "../../components/avatar/avatar";

const AddComment = () => {
  return (
    <div className="c-add-comment__container">
      <Avatar />
      <textarea className="c-add-comment__field"></textarea>
      <button className="c-add-comment__btn">Reply</button>
    </div>
  );
};

export default AddComment;
