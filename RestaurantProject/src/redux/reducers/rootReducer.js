import { combineReducers } from 'redux';
import restaurantsReducer from './restaurantsReducer';
import detailsReducer from './detailsReducer';
import photosReducer from './photosReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  details: detailsReducer,
  photos: photosReducer,
});

export default rootReducer;
