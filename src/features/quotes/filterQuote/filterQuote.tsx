import store from "../../../store";
import Select, { StylesConfig } from "react-select";
import { IColourOption } from "../../../models/types";

const FilterQuote = () => {
  const hashtagsList: any = [];
  store.hashtagsToFilter.forEach((el) => {
    hashtagsList.push({ label: el, value: el });
  });

  const colourStyles: StylesConfig<IColourOption> = {
    placeholder: (provided) => ({
      ...provided,
      fontSize: 14,
      color: "#757575",
    }),
  };

  const handleChange: any = (options: [], triggeredAction: any) => {
    store.setSelectedHashtags(options);

    if (triggeredAction.action === "clear") {
      store.setFoundQuery(store.quotesList);
    }
  };

  const onKeyDown: any = (e: any) => {
    const { key } = e;
    if (key === "Enter" && store.selectedHashtags.length > 0) {
      const val = store.selectedHashtags.map((el) => {
        return el.value.toLowerCase();
      });

      const result = store.quotesList.filter((qt) => {
        return qt.hashtags.some((h: any) => val.includes(h));
      });

      store.setFoundQuery(result);
    }
  };

  return (
    <div className="filter-quote">
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

export default FilterQuote;
