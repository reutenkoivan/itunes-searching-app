const addToFavorite = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE_SUCCESS": {
      if(typeof action.data != "undefined" && state.every(song => song.trackId - action.data.trackId))
        return [...state, action.data];

      return state.filter(song => song.trackId !== action.data.trackId)
    }
    case "ADD_TO_FAVORITE_ERROR": {
      return action.error;
    }
    default: {
      return state;
    }
  }
};

export default addToFavorite;
