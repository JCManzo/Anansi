import {
  FETCH_HOME_FEED_REQUEST,
  FETCH_HOME_FEED_SUCCESS,
  FETCH_HOME_FEED_FAILURE,
  UPLOAD_MODAL_TOGGLE_REQUEST,
  UPLOAD_PHOTOS_REQUEST,
  UPLOAD_PHOTOS_SUCCESS,
  UPLOAD_PHOTOS_FAILURE
} from '../constants/index';

const initialState = {
  isFetchingPhotoStream: false,
  receivedPhotoStream: false,
  photoStreamFailure: false,
  photos: [],
  queuedPhotos: [],
  isUploadModalOpen: false,
  uploadPhotoRequest: false,
  isPhotoUploadSuccess: false,
  isPhotoUploaFailure: false,
  statusText: null
};

// TODO: Look at redux site recipes for switch alternative
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_HOME_FEED_REQUEST:
      return Object.assign({}, state, {
        isFetchingPhotoStream: true,
        photoStreamFailure: false
      });
    case FETCH_HOME_FEED_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPhotoStream: false,
        receivedPhotoStream: true,
        photos: JSON.parse(action.payload.photos)
      });
    case FETCH_HOME_FEED_FAILURE:
      return Object.assign({}, state, {
        isFetchingPhotoStream: false,
        receivedPhotoStream: true,
        photoStreamFailure: true
      });
    case UPLOAD_MODAL_TOGGLE_REQUEST:
      return Object.assign({}, state, {
        isUploadModalOpen: !state.isUploadModalOpen,
        uploadPhotoRequest: false
      });
    case UPLOAD_PHOTOS_REQUEST:
      return Object.assign({}, state, {
        uploadPhotoRequest: true,
        isPhotoUploadSuccess: false,
        isPhotoUploaFailure: false
      });
    case UPLOAD_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        uploadPhotoRequest: false,
        isPhotoUploadSuccess: true
      });
    case UPLOAD_PHOTOS_FAILURE:
      return Object.assign({}, state, {
        uploadPhotoRequest: true,
        isPhotoUploadSuccess: false
      });
    default:
      return state;
  }
}
