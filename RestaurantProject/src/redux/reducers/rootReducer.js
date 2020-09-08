import { combineReducers } from 'redux';
import placeIdsReducer from './placeIdsReducer';
import detailsReducer from './detailsReducer';
import matchesReducer from './matchesReducer';
import typesReducer from './typesReducer';

const rootReducer = combineReducers({
  places: placeIdsReducer,
  details: detailsReducer,
  matches: matchesReducer,
  types: typesReducer,
});

export default rootReducer;
