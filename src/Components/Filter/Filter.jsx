import { useEffect } from "react";
import { useFilter } from "../../hooks/useFilter";
import Select from "react-select";
import { FILTER_OPTIONS } from "../../constants/filterConstants";
import css from "./Filter.module.css";

const options = Object.entries(FILTER_OPTIONS).map(([id, data]) => ({
  value: id,
  label: data.value,
}));

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "14px",
    marginTop: "8px",
    boxShadow: " 0 20px 69px 0 rgba(0, 0, 0, 0.07)",
    background: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f3f3f3" : "transparent",
    color: state.isSelected ? "#191a15" : " rgba(25, 26, 21, 0.3)",
  }),
};

export const Filter = () => {
  const { setFilter, selectedFilter, resetFilter } = useFilter();

  useEffect(() => {
    resetFilter();
  }, [resetFilter]);

  const getDefaultOption = (options) =>
    options.find(({ value }) => value === FILTER_OPTIONS.nameAsc.id);

  const handleSelect = (selectedOption) => {
    if (selectedOption.value === selectedFilter) {
      return;
    }

    setFilter(selectedOption.value);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Filters</h3>
      <Select
        isSearchable={false}
        styles={customStyles}
        onChange={handleSelect}
        options={options}
        defaultValue={getDefaultOption(options)}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
