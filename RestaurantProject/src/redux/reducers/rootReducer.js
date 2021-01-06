import { combineReducers } from 'redux';
import placeIdsReducer from './placeIdsReducer';
import detailsReducer from './detailsReducer';
import matchesReducer from './matchesReducer';
import typesReducer from './typesReducer';
import counterReducer from './counterReducer';
import queryReducer from './queryReducer';
import notificationReducer from './notificationReducer';
import photoSizeReducer from './photoSizeReducer';

const rootReducer = combineReducers({
  places: placeIdsReducer,
  details: detailsReducer,
  matches: matchesReducer,
  types: typesReducer,
  counter: counterReducer,
  query: queryReducer,
  notified: notificationReducer,
  photoSize: photoSizeReducer,
});

export default rootReducer;
