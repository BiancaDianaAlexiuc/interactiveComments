import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Avatar from "../../components/avatar/avatar";
import store from "../../store";
import Votes from "../../components/votes/votes";
import { v4 as uuidv4 } from "uuid";
import DeleteDialog from "../../components/deleteDialog/deleteDialog";
import AddComment from "../comments/addComment/addComment";
import Comments from "../comments/comments";
import FilterQuote from "./filterQuote/filterQuote";
import SearchQuote from "./searchQuote/searchQuote";

const Quotes = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);

  useEffect(() => {
    store.getQuotesList();
  }, []);

  const togglerComments = () => {
    setToggleComments((prev) => !prev);
  };

  const toggleReply = () => {
    setIsToggle((prev) => !prev);
  };

  const handleClick = (id: any) => {
    store.setSelectedQuote(id);
    togglerComments.call(store.selectedQuote);
    store.quotesList.map((qt) => {
      if (id === qt.id) {
        store.getComments(id);
      }
    });
  };

  const handleReplyClick = (id: any) => {
    toggleReply.call(id);
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
              let created = qt.created.toDate().toDateString();
              let updated = qt.updated.toDate().toDateString();
              let hashtags = qt.hashtags;
              return (
                <div className="quotes__container" key={qt.id}>
                  <div className="quotes__element">
                    <div>
                      <Votes
                        selected={"quote"}
                        votesNumber={qt.likes}
                        quoteId={qt.id}
                      />
                    </div>
                    <div style={{ width: "100%", paddingLeft: "20px" }}>
                      <div className="quotes__header">
                        <div className="quotes__header-details">
                          <Avatar></Avatar>
                          <p className="author">{qt.author}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              store.toggleDeleteDialog();
                              store.setSelectedQuote(qt.id);
                              store.setSelectedItem("quote");
                            }}
                            className="delete"
                          >
                            <span className="icon-delete"></span>
                            Delete
                          </button>
                          <button
                            onClick={() => handleReplyClick(qt.id)}
                            className="reply"
                          >
                            <span className="icon-reply"></span>
                            Reply
                          </button>
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          handleClick(qt.id);
                        }}
                        className="quote-text"
                        style={{ marginTop: "0" }}
                      >
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="created">Created at: {created} </p>
                        <p className="updated">Updated at: {updated}</p>
                      </div>
                    </div>
                  </div>
                  {isToggle && store.selectedQuote === qt.id && (
                    <AddComment selected="quote" id={qt.id} />
                  )}

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
