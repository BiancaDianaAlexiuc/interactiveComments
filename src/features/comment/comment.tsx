import SingleComment from "../../components/singleComment/singleComment";

interface Comment {
  id: string;
  comments: any;
}

const Comment: React.FC<Comment> = (props: Comment) => {
  return (
    <div className="c-comments__container">
      {props.comments.map((el: any) => {
        return (
          <SingleComment
            key={el.id}
            likes={el.likes}
            author={el.author}
            id={el.id}
            body={el.body}
            comments={el}
          />
        );
      })}
    </div>
  );
};

export default Comment;
