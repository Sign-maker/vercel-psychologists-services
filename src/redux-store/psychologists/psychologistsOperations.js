import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  get,
  getDatabase,
  ref,
  query,
  update,
  remove,
} from "firebase/database";
import {
  DB_FAVORITES_PATH,
  DB_PSYCHOLOGISTS_PATH,
  app,
} from "../../constants/firebase";
import { FILTER_OPTIONS, SORT_ORDER } from "../../constants/filterConstants";

const db = getDatabase(app);

export const getPsychologists = createAsyncThunk(
  "psychologists/getPsychologists",
  async (queryConstraint, thunkAPI) => {
    const selectedFilter = thunkAPI.getState().filter.selectedFilter;

    try {
      const tempItems = [];
      const currentRef = query(
        ref(db, DB_PSYCHOLOGISTS_PATH),
        ...queryConstraint
      );

      const snapShot = await get(currentRef);
      if (!snapShot.exists()) {
        return { tempItems, selectedFilter };
      }
      snapShot.forEach((item) => {
        tempItems.push({ ...item.val() });
      });

      if (FILTER_OPTIONS[selectedFilter].sortOrder === SORT_ORDER.desc) {
        tempItems.reverse();
      }

      return { tempItems, selectedFilter };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getFavorites = createAsyncThunk(
  "psychologists/getFavorites",
  async (responseParams, thunkAPI) => {
    const { uid, queryConstraint } = responseParams;
    const selectedFilter = thunkAPI.getState().filter.selectedFilter;

    try {
      const tempItems = [];
      const path = `${DB_FAVORITES_PATH}/${uid}`;
      const currentRef = query(ref(db, path), ...queryConstraint);
      const snapShot = await get(currentRef);
      if (!snapShot.exists()) {
        return { tempItems, selectedFilter };
      }
      snapShot.forEach((item) => {
        tempItems.push({ ...item.val() });
      });

      if (FILTER_OPTIONS[selectedFilter].sortOrder === SORT_ORDER.desc) {
        tempItems.reverse();
      }
      return { tempItems, selectedFilter };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "psychologists/addToFavorites",
  async (data, thunkAPI) => {
    try {
      const { favoritesDbDocLink, psychologistsDbDocLink, key, uid } = data;

      let path = DB_FAVORITES_PATH;
      await update(ref(db, path), favoritesDbDocLink);

      path = DB_PSYCHOLOGISTS_PATH;
      await update(ref(db, path), psychologistsDbDocLink);
      return { key, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "psychologists/removeFromFavorites",
  async (data, thunkAPI) => {
    try {
      const { favoritesDbDocLink, psychologistsDbDocLink, key, uid } = data;

      let path = `${DB_FAVORITES_PATH}/${favoritesDbDocLink}`;
      await remove(ref(db, path));

      path = `${DB_PSYCHOLOGISTS_PATH}/${psychologistsDbDocLink}`;
      await remove(ref(db, path));

      return { key, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
