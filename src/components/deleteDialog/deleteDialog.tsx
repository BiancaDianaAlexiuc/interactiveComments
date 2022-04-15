import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import db from "../../firebase-config";
import store from "../../store";


const DeleteDialog = () => {
  const deleteQuote = async (id: string) => {
    const quoteDoc = doc(db, "quotes", id);
    await deleteDoc(quoteDoc);

    store.toggleDeleteDialog();
    store.getQuotesList();
  };

  const deleteComment = async (obj: string) => {
    let  docId = store.selectedQuote;
    const ref: any = doc(db, "quotes", docId);

  
    await updateDoc(ref, {
      comment: arrayRemove(obj)
    })
    .catch((err) => {
      console.log("Error removing doc", err);
    })

    store.removeFromArray(store.commentObject, obj);
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
