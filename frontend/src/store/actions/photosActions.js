import axiosApi from "../../axiosApi";
import { toast } from "react-toastify";

export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTO_SUCCESS = "FETCH_PHOTO_SUCCESS";
export const ADD_PHOTO_SUCCESS = "ADD_PHOTO_SUCCESS";
export const ADD_PHOTO_FAILURE = "ADD_PHOTO_FAILURE";

export const fetchPhotosSuccess = (photos) => ({
  type: FETCH_PHOTOS_SUCCESS,
  photos,
});
export const fetchPhotoSuccess = (photo) => ({
  type: FETCH_PHOTO_SUCCESS,
  photo,
});
export const addPhotoSuccess = () => ({ type: ADD_PHOTO_SUCCESS });
export const addPhotoFailure = (error) => ({
  type: ADD_PHOTO_FAILURE,
  error,
});

export const fetchPhotos = (placeId) => {
  return async (dispatch) => {
    let response;
    if (!placeId) {
      response = await axiosApi.get("/photos");
    } else {
      response = await axiosApi.get(`/photos?placeId=${placeId}`);
    }
    dispatch(fetchPhotosSuccess(response.data));
  };
};

export const fetchPhoto = (id) => {
  return async (dispatch) => {
    const response = await axiosApi.get("/photos/" + id);
    dispatch(fetchPhotoSuccess(response.data));
  };
};

export const addPhoto = (data, placeId) => {
  return async (dispatch) => {
    try {
      await axiosApi.post("/photos", data);
      dispatch(addPhotoSuccess());
      dispatch(fetchPhotos(placeId));
      toast.success("Photo created", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      if (e.response) {
        dispatch(addPhotoFailure(e.response.data));
      } else {
        dispatch(
          addPhotoFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const deletePhoto = (photoId, placeId) => {
  return async (dispatch) => {
    try {
      await axiosApi.delete(`/photos/${photoId}`);
      dispatch(fetchPhotos(placeId));
    } catch (e) {
      console.log(e);
    }
  };
};
