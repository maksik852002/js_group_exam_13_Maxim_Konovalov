import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACE_SUCCESS,
  CREATE_PLACE_FAILURE
} from "../actions/placesActions";

const initialState = {
  places: [],
  place: [],
  error: null
};

const placesReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.places };
    case FETCH_PLACE_SUCCESS:
      return { ...state, place: action.place };
    case CREATE_PLACE_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default placesReduser;
