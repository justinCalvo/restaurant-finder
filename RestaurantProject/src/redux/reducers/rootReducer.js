import { combineReducers } from 'redux';
import restaurantsReducer from './restaurantsReducer';
import detailsReducer from './detailsReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  details: detailsReducer,
  matches: matchesReducer,
});

export default rootReducer;
