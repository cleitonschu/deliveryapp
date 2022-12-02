const initialState = {
    restaurantsFavorites: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_RESTAURANTS":
        return { ...state, restaurantsFavorites: action.payload.restaurantsFavorites };
        case "CLEAR_RESTAURANTS":
        return { ...initialState };
    }
    return state;
};
  