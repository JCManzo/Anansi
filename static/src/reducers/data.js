import {
  FETCH_PHOTOSTREAM_DATA_REQUEST,
  RECEIVE_PHOTOSTREAM_DATA_SUCCESS,
  RECEIVE_PHOTOSTREAM_DATA_FAILURE
} from '../constants/index';

const initialState = {
  isFetchingPhotoStream: false,
  receivedPhotoStream: false,
  photoStreamFailure: false,
  photos: []
};

// TODO: Possible bug with photos state not updating correctly. Might need
// to merge payload.data with state.data
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTOSTREAM_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetchingPhotoStream: true,
        photoStreamFailure: false
      });
    case RECEIVE_PHOTOSTREAM_DATA_SUCCESS:
      const newState = Object.assign({}, state, {
        isFetchingPhotoStream: false,
        receivedPhotoStream: true,
        photos: JSON.parse(action.payload.photos)
      });
      return newState;
    case RECEIVE_PHOTOSTREAM_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetchingPhotoStream: false,
        receivedPhotoStream: true,
        photoStreamFailure: true
      });
    default:
      return state;
  }
}
