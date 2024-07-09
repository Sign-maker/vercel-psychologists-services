import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import * as psychologistsOperations from "../redux-store/psychologists/psychologistsOperations";
import {
  selectFavorites,
  selectIsPsychologistsLoading,
  selectNextKey,
  selectNextValue,
  selectPsychologists,
} from "../redux-store/psychologists/psychologistsSelectors";
import { psychologistsSlice } from "../redux-store/psychologists/psychologistsSlice";

export const usePsychologists = () => {
  const dispatch = useDispatch();

  const psychologistsItems = useSelector(selectPsychologists);
  const isPsychologistsLoading = useSelector(selectIsPsychologistsLoading);
  const nextValue = useSelector(selectNextValue);
  const nextKey = useSelector(selectNextKey);
  const favoritesItems = useSelector(selectFavorites);

  const resetPsychologists = useCallback(
    () => dispatch(psychologistsSlice.actions.resetPsychologists()),
    [dispatch]
  );

  const getPsychologists = useCallback(
    (requestData) =>
      dispatch(psychologistsOperations.getPsychologists(requestData)).unwrap(),
    [dispatch]
  );

  const getFavorites = useCallback(
    (requestData) =>
      dispatch(psychologistsOperations.getFavorites(requestData)).unwrap(),
    [dispatch]
  );

  const addToFavorites = useCallback(
    (data) => dispatch(psychologistsOperations.addToFavorites(data)).unwrap(),
    [dispatch]
  );
  const removeFromFavorites = useCallback(
    (data) =>
      dispatch(psychologistsOperations.removeFromFavorites(data)).unwrap(),
    [dispatch]
  );

  return {
    psychologistsItems,
    isPsychologistsLoading,
    nextKey,
    nextValue,
    favoritesItems,
    getPsychologists,
    resetPsychologists,

    getFavorites,
    addToFavorites,
    removeFromFavorites,
  };
};
