import { combineReducers } from 'redux';
import restaurantsReducer from './restaurantsReducer';
import detailsReducer from './detailsReducer';
import photosReducer from './photosReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  details: detailsReducer,
  photos: photosReducer,
  matches: matchesReducer,
});

export default rootReducer;
