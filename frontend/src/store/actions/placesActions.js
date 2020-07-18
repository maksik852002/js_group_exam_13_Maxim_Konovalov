import axiosApi from "../../axiosApi";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

export const FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS";
export const FETCH_PLACE_SUCCESS = "FETCH_PLACE_SUCCESS";
export const CREATE_PLACE_SUCCESS = "CREATE_PLACE_SUCCESS";
export const CREATE_PLACE_FAILURE = "CREATE_PLACE_FAILURE";

export const fetchPlacesSuccess = (places) => ({
  type: FETCH_PLACES_SUCCESS,
  places,
});
export const fetchPlaceSuccess = (place) => ({
  type: FETCH_PLACE_SUCCESS,
  place,
});
export const createPlaceSuccess = () => ({ type: CREATE_PLACE_SUCCESS });
export const createPlaceFailure = (error) => ({
  type: CREATE_PLACE_FAILURE,
  error,
});

export const fetchPlaces = () => {
  return async (dispatch) => {
    const response = await axiosApi.get("/places");
    dispatch(fetchPlacesSuccess(response.data));
  };
};

export const fetchPlace = (id) => {
  return async (dispatch) => {
    const response = await axiosApi.get("/places/" + id);
    dispatch(fetchPlaceSuccess(response.data));
  };
};

export const createPlace = (data) => {
  return async (dispatch) => {
    try {
      await axiosApi.post("/places", data);
      dispatch(createPlaceSuccess());
      dispatch(push("/"));
      toast.success("Place created", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      if (e.response) {
        dispatch(createPlaceFailure(e.response.data));
      } else {
        dispatch(
          createPlaceFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const deletePlace = (placeId) => {
  return async (dispatch) => {
    try {
      await axiosApi.delete(`/places/${placeId}`);
      dispatch(fetchPlaces());
      toast.success("Place deleted", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
