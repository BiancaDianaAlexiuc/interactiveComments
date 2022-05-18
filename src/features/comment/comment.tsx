import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";
import SingleComment from "../../components/singleComment/singleComment";
import store from "../../store";

interface Comment {
  id: string;
  comments: any;
}

const Comment: React.FC<Comment> = (props: Comment) => {
  return (
    <div className="c-comments__container">
      {Object.entries(props.comments).map((el: any) => {
        console.log(store.isObject(el))
        return (
          <SingleComment
            key={uuidv4()}
            votes={el[1].votes}
            author={el[1].author}
            id={el.id}
            body={el[1].body}
            comments={el[1]}
           />
        )
      })}
    </div>
  );
};

export default observer(Comment);
