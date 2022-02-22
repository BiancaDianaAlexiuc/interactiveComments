import { useForm } from "react-hook-form";
import store from "../../store";

import { addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

const AddQuote = () => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const closeModal = () => {
    store.showAddQuote = !store.showAddQuote;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (
      key === "Backspace" &&
      !input.length &&
      tags.length &&
      store.isKeyReleased
    ) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    store.setIsKeyReleased(false);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onSubmit = async (data) => {
    store.setNewAuthor(data.author);
    store.setNewQuoteText(data.quoteText);
    store.setNewHashtags(tags);
    console.log({
      author: store.newAuthor,
      text: store.newQuoteText,
      hash: store.newHashtags,
    });

    await addDoc(store.quoteCollectionRef, {
      author: store.newAuthor,
      body: store.newQuoteText,
      hashtags: store.newHashtags,
      created: Timestamp.fromDate(new Date()),
      updated: Timestamp.fromDate(new Date()),
      votes: 0,
      comments: [],
    });

    closeModal();
    store.getQuotesList();
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
          <label
            className={
              errors.author
                ? "modal__form-label modal__form-label--error"
                : "modal__form-label"
            }
          >
            Author *
            <input
              className="modal__form-input"
              {...register("author", { required: true })}
            />
          </label>
          {errors.author && (
            <p className="modal__form-error">Author is a required field.</p>
          )}
          <label
            className={
              errors.quoteText
                ? "modal__form-label modal__form-label--error"
                : "modal__form-label"
            }
          >
            Quote text *
            <textarea
              className="modal__form-input"
              {...register("quoteText", { required: true })}
            />
          </label>
          {errors.quoteText && (
            <p className="modal__form-error">Quote text is a required field.</p>
          )}

          <label
            className={
              errors.hashtags
                ? "modal__form-label modal__form-label--error"
                : "modal__form-label"
            }
          >
            Hashtags *
            <div className="modal__form-container">
              {tags.map((tag, index) => (
                <div className="tag" key={uuidv4()}>
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
              <input
                value={input}
                {...register("hashtags", { required: tags.length === 0 })}
                onKeyDown={onKeyDown}
                onChange={onChange}
                onKeyUp={store.onKeyUp}
              />
            </div>
          </label>
          {errors.hashtags && (
            <p className="modal__form-error">Hashtags is a required field</p>
          )}
        </form>
        <button onClick={handleSubmit(onSubmit)} className="modal__form-submit">
          Add Quote
        </button>
      </div>
    </div>
  );
};

export default AddQuote;
