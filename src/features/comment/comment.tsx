import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";
import SingleComment from "../../components/singleComment/singleComment";

interface Comment {
  commentId: string;
  comments: any;
}

const Comment: React.FC<Comment> = (props: Comment) => {
  return (
    <div className="comment">
      {props.comments.map((el: any) => {
        return (
          <SingleComment
            key={uuidv4()}
            votes={el.votes}
            author={el.author}
            commentId={el.uid}
            body={el.body}
            comments={el}
          />
        );
      })}
    </div>
  );
};

export default observer(Comment);
