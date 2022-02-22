import { observer } from "mobx-react";
import { useEffect } from "react";
import Avatar from "../../components/avatar/avatar";
import store from "../../store";
import Votes from "../votes/votes";
import { v4 as uuidv4 } from "uuid";
import DeleteDialog from "../../components/deleteDialog/deleteDialog";

const Quote = () => {
  useEffect(() => {
    store.getQuotesList();
  }, []);

  return (
    <div className="c-quote__list">
      {store.quotesList.map((qt: any) => {
        let created = qt.created.toDate().toDateString();
        let updated = qt.updated.toDate().toDateString();
        let hashtags = qt.hashtags;
        return (
          <div className="c-quote__element" key={qt.id}>
            <div>
              <Votes />
            </div>
            <div style={{ width: "100%" }}>
              <div className="c-quote__header">
                <div className="c-quote__header-details">
                  <Avatar></Avatar>
                  <p className="author">{qt.author}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      store.toggleDeleteDialog();
                      store.setSelectedQuote(qt.id);
                      console.log(store.selectedQuote);
                    }}
                    className="delete"
                  >
                    <span className="icon-delete"></span>
                    Delete
                  </button>
                  <button className="reply">
                    <span className="icon-reply"></span>
                    Reply
                  </button>
                </div>
              </div>
              <p className="quote-text" style={{ marginTop: "0" }}>
                {qt.body}
              </p>
              <ul className="hashtag-list">
                {hashtags.map((hashtag: string) => {
                  return (
                    <li key={uuidv4()} className="hashtag">
                      #{hashtag}
                    </li>
                  );
                })}
              </ul>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="created">Created at: {created} </p>
                <p className="updated">Updated at: {updated}</p>
              </div>
            </div>
          </div>
        );
      })}
      {store.showDeleteDialog && <DeleteDialog />}
    </div>
  );
};

export default observer(Quote);
