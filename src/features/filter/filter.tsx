import store from "../../store";
import Select, { StylesConfig } from "react-select";
import { toJS } from "mobx";
import { visitParameterList } from "typescript";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const Filter = () => {
  const hashtagsList: any = [];
  store.hashtagsToFilter.forEach((el) => {
    hashtagsList.push({ label: el, value: el });
  });

  const colourStyles: StylesConfig<ColourOption> = {
    placeholder: (provided) => ({
      ...provided,
      fontSize: 14,
      color: "#757575",
    }),
  };

  const handleChange: any = (options: []) => {
    store.setSelectedHashtags(options);
    console.log("change", toJS(store.selectedHashtags));
  };

  const onKeyDown: any = (e: any) => {
    const { key } = e;
    if (key === "Enter" && store.selectedHashtags.length > 0) {
      console.log("enter", toJS(store.selectedHashtags));
      const val = store.selectedHashtags.map((el) => {
        return el.value.toLowerCase();
      });

      console.log("QUOTES LIST", toJS(store.quotesList));
      const result = store.quotesList.filter((qt) => {
        // console.log("VALLLL ==============", val, toJS(qt));
        // const hashtag = qt.hashtags.map((h: any) => {
        //   return h.toLowerCase();
        // });

        console.log(toJS(qt.hashtags));

        // return hashtag;

        return qt.hashtags.contains(val);
      });
      store.setFoundQuery(result);

      // console.log("result here", toJS(result));
    }
  };

  return (
    <div className="c-filter__container">
      <Select
        isMulti
        name="colors"
        options={hashtagsList}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Search using hashtags"
        styles={colourStyles}
        onKeyDown={onKeyDown}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
