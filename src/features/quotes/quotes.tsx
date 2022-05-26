import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import store from "../../store";
import { v4 as uuidv4 } from "uuid";
import DeleteDialog from "../../components/deleteDialog/deleteDialog";
import Comments from "../comments/comments";
import FilterQuote from "./filterQuote/filterQuote";
import SearchQuote from "./searchQuote/searchQuote";
import SingleQuote from "./singleQuote/singleQuote";

const Quotes = () => {
  const [toggleComments, setToggleComments] = useState(false);

  useEffect(() => {
    store.getQuotesList();
  }, []);

  const togglerComments = () => {
    setToggleComments((prev) => !prev);
  };

  const handleShowComments = (id: any) => {
    store.setSelectedQuote(id);
    togglerComments.call(store.selectedQuote);
    store.quotesList.map((qt) => {
      if (id === qt.id) {
        store.getComments(id);
      }
    });
  };

  const handleDeleteClick = (id: string) => {
    store.toggleDeleteDialog();
    store.setSelectedQuote(id);
    store.setSelectedItem("quote");
  };

  return (
    <>
      <div className="quotes">
        <div className="quotes__filters">
          <SearchQuote />
          <FilterQuote />
        </div>
        <div className="quotes__list">
          {store.foundQuery && store.foundQuery.length > 0 ? (
            store.foundQuery.map((qt: any) => {
              return (
                <div className="quotes__container" key={qt.id}>
                  <SingleQuote
                    selected={"quote"}
                    votesNumber={qt.likes}
                    quoteId={qt.id}
                    author={qt.author}
                    body={qt.body}
                    handleDeleteClick={handleDeleteClick}
                    handleShowComments={handleShowComments}
                    hashtags={qt.hashtags}
                    created={qt.created.toDate().toDateString()}
                    updated={qt.updated.toDate().toDateString()}
                    comments={""}
                  />

                  {store.selectedQuote === qt.id && toggleComments && (
                    <Comments
                      comments={store.commentObject}
                      commentId={store.selectedQuote}
                      key={uuidv4()}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <h1>No results found!</h1>
          )}

          {store.showDeleteDialog && <DeleteDialog />}
        </div>
      </div>
    </>
  );
};

export default observer(Quotes);
