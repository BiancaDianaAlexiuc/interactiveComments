import { useForm } from "react-hook-form";
import store from "../../store";

import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { timeStamp } from "console";

const AddQuote = () => {
  const closeModal = () => {
    store.showAddQuote = !store.showAddQuote;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    store.setNewAuthor(data.author);
    store.setNewQuoteText(data.quoteText);
    store.setNewHashtags(data.hashtags);
    console.log({
      author: store.newAuthor,
      text: store.newQuoteText,
      hash: store.newHashtags,
    });

    await addDoc(store.quoteCollectionRef, {
      author: store.newAuthor,
      body: store.newQuoteText,
      hashtags: [store.newHashtags],
      created: Timestamp.fromDate(new Date()),
      updated: Timestamp.fromDate(new Date()),
      votes: 0,
      comments: [],
    });

    store.showAddQuote = !store.showAddQuote;
  };

  return (
    <div id="customModal" className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h1 className="modal__title">Add a quote</h1>
          <span onClick={closeModal} className="modal__close">
            &times;
          </span>
        </div>
        <form className="modal__form">
          <label className="modal__form-label">
            Author:
            <input className="modal__form-input" {...register("author")} />
          </label>

          <label className="modal__form-label">
            Quote text:
            <textarea
              className="modal__form-input"
              {...register("quoteText")}
            />
          </label>

          <label className="modal__form-label">
            Hashtags
            <input className="modal__form-input" {...register("hashtags")} />
          </label>
        </form>
        <button onClick={handleSubmit(onSubmit)} className="modal__form-submit">
          Add Quote
        </button>
      </div>
    </div>
  );
};

export default AddQuote;
