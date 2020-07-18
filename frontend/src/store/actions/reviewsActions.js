import axiosApi from "../../axiosApi";
import { toast } from "react-toastify";
import {fetchPlace} from './placesActions';

export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
export const CREATE_REVIEW_FAILURE = "CREATE_REVIEW_FAILURE";

export const createReviewSuccess = () => ({ type: CREATE_REVIEW_SUCCESS });
export const createReviewFailure = (error) => ({type: CREATE_REVIEW_FAILURE, error});

export const createReview = (data) => {
  return async (dispatch) => {
    try {
      await axiosApi.post("/reviews", data);
      dispatch(createReviewSuccess());
      dispatch(fetchPlace(data.place));
      toast.success("Review created", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      if (e.response) {
        dispatch(createReviewFailure(e.response.data));
      } else {
        dispatch(
          createReviewFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const deleteReview = (reviewId, placeId) => {
  return async (dispatch) => {
    try {
      await axiosApi.delete(`/reviews/${reviewId}`);
      dispatch(fetchPlace(placeId));
    } catch (e) {
      console.log(e);
    }
  };
};
