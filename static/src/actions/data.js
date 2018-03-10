import {
  FETCH_HOME_FEED_REQUEST,
  FETCH_HOME_FEED_SUCCESS,
  FETCH_HOME_FEED_FAILURE,
  UPLOAD_MODAL_TOGGLE_REQUEST,
  UPLOAD_PHOTOS_REQUEST,
  UPLOAD_PHOTOS_SUCCESS,
  UPLOAD_PHOTOS_FAILURE
} from '../constants/index';

import { fetchPhotos } from '../utils/http_funcs';

// Upload actions
export function uploadModalToggleRequest() {
  return {
    type: UPLOAD_MODAL_TOGGLE_REQUEST
  };
}

export function uploadPhotosRequest() {
  return {
    type: UPLOAD_PHOTOS_REQUEST
  };
}

export function uploadPhotosFailure() {
  return {
    type: UPLOAD_PHOTOS_FAILURE
  };
}

export function uploadPhotosSuccess() {
  return {
    type: UPLOAD_PHOTOS_SUCCESS
  };
}

// Home feed actions
export function fetchHomeFeedFailure() {
  return {
    type: FETCH_HOME_FEED_FAILURE
  };
}

export function fetchHomeFeedRequest() {
  return {
    type: FETCH_HOME_FEED_REQUEST
  };
}

export function fetchHomeFeedSuccess(photos) {
  return {
    type: FETCH_HOME_FEED_SUCCESS,
    payload: {
      photos
    }
  };
}

export function fetchHomeFeed() {
  return function(dispatch) {
    dispatch(fetchHomeFeedRequest());
    return fetchPhotos()
     .then((jsonResponse) => {
        dispatch(fetchHomeFeedSuccess(jsonResponse.data));
      })
      .catch((error) => {
        dispatch(fetchHomeFeedFailure({
          response: {
            status: 500,
            statusText: 'There was a error retrieving photostream'
          }
        }));
      });
    }
}
