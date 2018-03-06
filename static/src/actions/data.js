import {
  FETCH_PHOTOSTREAM_DATA_REQUEST,
  RECEIVE_PHOTOSTREAM_DATA_SUCCESS,
  RECEIVE_PHOTOSTREAM_DATA_FAILURE
} from '../constants/index';

import { getAllPhotos } from '../utils/http_funcs';

export function photostreamDataFailure() {
  return {
    type: RECEIVE_PHOTOSTREAM_DATA_FAILURE
  };
}

export function fetchPhotoStreamRequest() {
  return {
    type: FETCH_PHOTOSTREAM_DATA_REQUEST
  };
}

export function photostreamDataSuccess(photos) {
  return {
    type: RECEIVE_PHOTOSTREAM_DATA_SUCCESS,
    payload: {
      photos
    }
  };
}

export function fetchPhotoStream() {
  return function(dispatch) {
    dispatch(fetchPhotoStreamRequest());
    return getAllPhotos()
     .then((jsonResponse) => {
        dispatch(photostreamDataSuccess(jsonResponse.data));
      })
      .catch((error) => {
        dispatch(photostreamDataFailure({
          response: {
            status: 500,
            statusText: 'There was a error retrieving photostream'
          }
        }));
      });
    }
};
