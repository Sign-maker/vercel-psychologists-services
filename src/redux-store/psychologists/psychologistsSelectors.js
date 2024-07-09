export const selectPsychologists = (state) =>
  state.psychologists.psychologistsItems;

export const selectIsPsychologistsLoading = (state) =>
  state.psychologists.isPsychologistsLoading;

export const selectNextKey = (state) =>
  state.psychologists.paginationParams.nextKey;

export const selectNextValue = (state) =>
  state.psychologists.paginationParams.nextValue;

export const selectFavorites = (state) => state.psychologists.favoritesItems;
