import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import store from "../../store";

const DeleteDialog = () => {
  const deleteQuote = async (id: string) => {
    const quoteDoc = doc(db, "quotes", id);
    await deleteDoc(quoteDoc);

    store.toggleDeleteDialog();
    store.getQuotesList();
  };

  return (
    <div className="modal__delete">
      <div className="modal__delete-content">
        <div className="modal__delete-header">
          <h2 className="modal__delete-title">Delete quote</h2>
        </div>
        <div className="modal__delete-body">
          <p className="modal__delete-desc">
            Are you sure you want to delete this quote? This will remove the
            quote and can't be undone.
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
                deleteQuote(store.selectedQuote);
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
