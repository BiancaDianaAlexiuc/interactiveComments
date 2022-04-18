
interface UpdateComment {
    value: string;
}

const UpdateComment: React.FC<UpdateComment> = (props: UpdateComment ) => {
    return (
         <div className="c-comment-update">
            <input className="c-comment-update__field" type="text" value={props.value} onChange={() => {}} />
            <button className="c-comment-update__btn">Update</button>
          </div>
    )
}

export default UpdateComment;