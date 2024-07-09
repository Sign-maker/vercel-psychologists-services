import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getFavorites,
  getPsychologists,
  removeFromFavorites,
} from "./psychologistsOperations";
import { FILTER_OPTIONS, LIMIT } from "../../constants/filterConstants";
import { FAVORITE_FOR_USERS_KEY } from "../../constants/firebase";

const initialState = {
  psychologistsItems: [],
  isPsychologistsLoading: false,
  paginationParams: { nextKey: null, nextValue: null },
  favoritesItems: [],
  error: null,
};

export const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    resetPsychologists: (state) => {
      state.psychologistsItems = [];
      state.favoritesItems = [];
      state.isPsychologistsLoading = false;
      state.paginationParams.nextKey = null;
      state.paginationParams.nextValue = null;
    },
  },
  extraReducers: (builder) => {
    //getPsychologists
    builder.addCase(getPsychologists.pending, (state) => {
      state.isPsychologistsLoading = true;
    });

    builder.addCase(getPsychologists.fulfilled, (state, { payload }) => {
      const { tempItems, selectedFilter } = payload;

      if (tempItems.length > LIMIT) {
        state.paginationParams.nextKey = tempItems[tempItems.length - 1].key;
        if (FILTER_OPTIONS[selectedFilter].key) {
          state.paginationParams.nextValue =
            tempItems[tempItems.length - 1][FILTER_OPTIONS[selectedFilter].key];
        }

        tempItems.pop();
      } else {
        state.paginationParams.nextKey = null;
        state.paginationParams.nextValue = null;
      }

      state.psychologistsItems = [...state.psychologistsItems, ...tempItems];
      state.isPsychologistsLoading = false;
      state.error = null;
    });

    builder.addCase(getPsychologists.rejected, (state, { payload }) => {
      state.error = payload;
      state.isPsychologistsLoading = false;
    });
    //getFavorites
    builder.addCase(getFavorites.pending, (state) => {
      state.isPsychologistsLoading = true;
    });

    builder.addCase(getFavorites.fulfilled, (state, { payload }) => {
      const { tempItems, selectedFilter } = payload;

      if (tempItems.length > LIMIT) {
        state.paginationParams.nextKey = tempItems[tempItems.length - 1].key;
        if (FILTER_OPTIONS[selectedFilter].key) {
          state.paginationParams.nextValue =
            tempItems[tempItems.length - 1][FILTER_OPTIONS[selectedFilter].key];
        }

        tempItems.pop();
      } else {
        state.paginationParams.nextKey = null;
        state.paginationParams.nextValue = null;
      }

      state.favoritesItems = [...state.favoritesItems, ...tempItems];
      state.isPsychologistsLoading = false;
      state.error = null;
    });

    builder.addCase(getFavorites.rejected, (state, { payload }) => {
      state.error = payload;
      state.isPsychologistsLoading = false;
    });
    //addToFavorites
    builder.addCase(addToFavorites.pending, (state) => {
      state.isPsychologistsLoading = true;
    });

    builder.addCase(addToFavorites.fulfilled, (state, { payload }) => {
      const { uid, key } = payload;

      const idx = state.psychologistsItems.findIndex(
        (item) => item.key === key
      );
      if (idx !== -1) {
        let tempObj = { ...state.psychologistsItems[idx] };

        if (!Object.hasOwn(tempObj, FAVORITE_FOR_USERS_KEY)) {
          tempObj = { ...tempObj, [FAVORITE_FOR_USERS_KEY]: {} };
        }

        tempObj[FAVORITE_FOR_USERS_KEY][uid] = true;
        state.psychologistsItems[idx] = { ...tempObj };
      }

      state.isPsychologistsLoading = false;
      state.error = null;
    });

    builder.addCase(addToFavorites.rejected, (state, { payload }) => {
      state.error = payload;
      state.isPsychologistsLoading = false;
    });
    //removeFromFavorites
    builder.addCase(removeFromFavorites.pending, (state) => {
      state.isPsychologistsLoading = true;
    });

    builder.addCase(removeFromFavorites.fulfilled, (state, { payload }) => {
      const { uid, key } = payload;

      const idx = state.psychologistsItems.findIndex(
        (item) => item.key === key
      );
      if (idx !== -1) {
        const tempFavoriteForUsers = {
          ...state.psychologistsItems[idx][FAVORITE_FOR_USERS_KEY],
        };
        delete tempFavoriteForUsers[uid];

        state.psychologistsItems[idx][FAVORITE_FOR_USERS_KEY] = {
          ...tempFavoriteForUsers,
        };
      }

      const newIdx = state.favoritesItems.findIndex((item) => item.key === key);
      if (newIdx !== -1) {
        state.favoritesItems.splice(newIdx, 1);
      }
      state.isPsychologistsLoading = false;
      state.error = null;
    });

    builder.addCase(removeFromFavorites.rejected, (state, { payload }) => {
      state.error = payload;
      state.isPsychologistsLoading = false;
    });
  },
});
