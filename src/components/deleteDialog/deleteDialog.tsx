import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toJS } from "mobx";
import db from "../../firebase-config";
import store from "../../store";

const DeleteDialog = () => {
  const deleteQuote = async (id: string) => {
    const quoteDoc = doc(db, "quotes", id);
    const commentsDoc = query(
      collection(db, "comments"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(commentsDoc);

    await deleteDoc(quoteDoc);

    querySnapshot.docs.map((el) => {
      const commentsRef = doc(db, "comments", el.id);
      deleteDoc(commentsRef);
    });

    store.toggleDeleteDialog();
    store.getQuotesList();
  };

  const deleteComment = async (obj: any) => {
    let docId = obj.uid;
    const comDoc = doc(db, "comments", docId);
    console.log("DOC ID", docId, toJS(obj));

    await deleteDoc(comDoc);

    store.toggleDeleteDialog();
    store.getComments(docId);
  };

  return (
    <div className="delete-dialog">
      <div className="delete-dialog__content">
        <div className="delete-dialog__header">
          <h2 className="delete-dialog__title">
            Delete {store.selectedItem === "quote" ? "quote" : "comment"}
          </h2>
        </div>
        <div className="delete-dialog__body">
          <p className="delete-dialog__desc">
            Are you sure you want to delete this{" "}
            {store.selectedItem === "quote" ? "quote" : "comment"}? This will
            remove the quote and can't be undone.
          </p>
          <div className="delete-dialog__btns">
            <button
              onClick={store.toggleDeleteDialog}
              className="delete-dialog__btn delete-dialog__btn--cancel"
            >
              No, Cancel
            </button>
            <button
              onClick={() => {
                store.selectedItem === "quote"
                  ? deleteQuote(store.selectedQuote)
                  : deleteComment(store.selectedComment);
                console.log("SELECTED COM", toJS(store.selectedComment));
              }}
              className="delete-dialog__btn delete-dialog__btn--confirm"
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
