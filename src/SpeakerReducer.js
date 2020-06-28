export const SpeakerReducer = (state, action) => {
  function updateFavorite(favoriteValue) {
    return state.map((speaker) => {
      if (speaker.id === action.sessionId) {
        return { ...speaker, favorite: favoriteValue };
      }
      return speaker;
    });
  }

  switch (action.type) {
    case "setSpeakerList":
      return action.data;
    case "favorite":
      return updateFavorite(true);
    case "unfavorite":
      return updateFavorite(false);

    default:
      return state;
  }
};
