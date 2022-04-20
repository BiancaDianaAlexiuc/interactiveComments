import { arrayRemove, arrayUnion, doc, FieldValue, Timestamp, updateDoc } from "firebase/firestore";
import { observer } from "mobx-react";
import db from "../../firebase-config";
import store from "../../store";
import { v4 as uuidv4 } from "uuid";
import { strictEqual } from "assert";
import { toJS } from "mobx";

interface UpdateComment {
    value: string;
    id: string;
    selectedCommentObj: Object;
}

const UpdateComment: React.FC<UpdateComment> = (props: UpdateComment ) => {

   const  updateComment  = async (obj: Object) => {
       let docId = store.selectedQuote;
       const ref: any = doc(db, "quotes", docId);

       console.log('b efore update');
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

    //    const lastElement = store.commentObject[store.commentObject.length -1];

    //    console.log("comm obj before push", toJS(store.commentObject))
    //    store.commentObject.splice(0, lastElement);
    //      console.log("comm obj after push", toJS(store.commentObject))

    //   await ref.set({
    //     comment : arrayUnion({
    //         id: uuidv4(),
    //         author: "Bianca",
    //         body: store.updatedCommentValue,
    //         created: Timestamp.fromDate(new Date()),
    //         updated: Timestamp.fromDate(new Date()),
    //         votes: 0,
    //     })
    //    }, {merge: true})

    }

    return (
         <div className="c-comment-update">
            <input className="c-comment-update__field" type="text" defaultValue={props.value} onChange={(e) => {store.setUpdatedCommentValue(e.target.value)}} />
            <button onClick={() => updateComment(props.selectedCommentObj)} className="c-comment-update__btn">Update</button>
          </div>
    )
}

export default observer(UpdateComment);