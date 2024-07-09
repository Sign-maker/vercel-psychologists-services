import { useDispatch, useSelector } from "react-redux";
import * as authOperations from "../redux-store/auth/authOperations";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsUserLoading,
  selectUser,
  selectUserError,
} from "../redux-store/auth/authSelectors";
import { useCallback } from "react";

export const useAuth = () => {
  const dispath = useDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isUserLoading = useSelector(selectIsUserLoading);
  const userError = useSelector(selectUserError);

  const signUp = useCallback(
    (credential) => dispath(authOperations.signUp(credential)).unwrap(),
    [dispath]
  );

  const signIn = useCallback(
    (credential) => dispath(authOperations.signIn(credential)).unwrap(),
    [dispath]
  );

  const signOutUser = useCallback(
    () => dispath(authOperations.signOutUser()).unwrap(),
    [dispath]
  );

  const getCurrent = useCallback(
    () => dispath(authOperations.getCurrent()),
    [dispath]
  );

  return {
    user,
    isLoggedIn,
    isRefreshing,
    isUserLoading,
    userError,
    signUp,
    signIn,
    signOutUser,
    getCurrent,
  };
};
