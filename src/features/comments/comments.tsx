import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";
import SingleComment from "./singleComment/singleComment";
import { IComment } from "../../models/types";

const Comments: React.FC<IComment> = (props: IComment) => {
  return (
    <div className="comments">
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

export default observer(Comments);
