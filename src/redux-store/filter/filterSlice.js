import { createSlice } from "@reduxjs/toolkit";
import { FILTER_OPTIONS } from "../../constants/filterConstants";

const initialState = {
  selectedFilter: FILTER_OPTIONS.nameAsc.id,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.selectedFilter = payload;
    },
    resetFilter: (state) => {
      state.selectedFilter = initialState.selectedFilter;
    },
  },
});
