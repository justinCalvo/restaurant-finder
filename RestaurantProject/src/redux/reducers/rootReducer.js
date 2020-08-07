import { combineReducers } from 'redux';
import restaurantsReducer from './restaurantsReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  details: detailsReducer,
});

export default rootReducer;
