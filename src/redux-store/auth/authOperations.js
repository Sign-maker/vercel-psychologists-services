import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../constants/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credential, thunkAPI) => {
    const { email, password, name } = credential;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: name,
      });
      return user.toJSON();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.code });
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credential, thunkAPI) => {
    const { email, password } = credential;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user.toJSON();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.code });
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getCurrent = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const getCurrentUser = () =>
        new Promise((resolve, reject) => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              resolve(user);
            } else {
              reject("No user signed in");
            }
          });
        });
      const user = await getCurrentUser();
      return user.toJSON();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error });
    }
  }
);
