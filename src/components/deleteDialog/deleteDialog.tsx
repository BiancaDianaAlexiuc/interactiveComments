import { doc, deleteDoc, updateDoc, arrayRemove, collection, getDocs } from "firebase/firestore";
import { toJS } from "mobx";
import { idText } from "typescript";
import db from "../../firebase-config";
import store from "../../store";


const DeleteDialog = () => {
  const deleteQuote = async (id: string) => {
    const quoteDoc = doc(db, "quotations", id);
    await deleteDoc(quoteDoc);

    store.toggleDeleteDialog();
    store.getQuotesList();
  };

  const deleteComment = async (obj: any) => {
    let  docId = obj.id;
    console.log('DOC ID', docId);
    const comments = collection(db, 'quotations', docId, 'comments');
    const querySnapshot = await getDocs(comments);
    console.log('comments', querySnapshot.docs.map(d => ({id: d.id, ...d.data()})));
    //const ref: any = doc(db, 'quotations', docId);

    querySnapshot.docs.map((d) => {
      console.log('from here =>>>>>>>>>>>>>>', {id: d.id, ...d.data});
    });

    // await deleteDoc(ref);

  
    // await updateDoc(ref, {
    //   comment: arrayRemove(obj)
    // })
    // .catch((err) => {
    //   console.log("Error removing doc", err);
    // })

    // store.removeFromArray(store.commentObject, obj);
    store.toggleDeleteDialog();
    
  }

  

  return (
    <div className="modal__delete">
      <div className="modal__delete-content">
        <div className="modal__delete-header">
          <h2 className="modal__delete-title">
            Delete {store.toDelete === "quote" ? "quote" : "comment"}
          </h2>
        </div>
        <div className="modal__delete-body">
          <p className="modal__delete-desc">
            Are you sure you want to delete this{" "}
            {store.toDelete === "quote" ? "quote" : "comment"}? This will remove
            the quote and can't be undone.
          </p>
          <div className="modal__delete-btns">
            <button
              onClick={store.toggleDeleteDialog}
              className="modal__delete-btn modal__delete-btn--cancel"
            >
              No, Cancel
            </button>
            <button
              onClick={() => {

                store.toDelete === "quote" ? deleteQuote(store.selectedQuote) : deleteComment(store.selectedComment)
                console.log('SELECTED COM', toJS(store.selectedComment))
                
              }}
              className="modal__delete-btn modal__delete-btn--confirm"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
