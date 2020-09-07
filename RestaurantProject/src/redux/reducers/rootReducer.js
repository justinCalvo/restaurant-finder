import { combineReducers } from 'redux';
import placeIdsReducer from './placeIdsReducer';
import detailsReducer from './detailsReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  places: placeIdsReducer,
  details: detailsReducer,
  matches: matchesReducer,
});

export default rootReducer;
