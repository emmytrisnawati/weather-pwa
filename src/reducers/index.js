import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main from '../pages/Main/reducer';

const rootReducer = combineReducers({
  main,
  routing: routerReducer,
});

export default rootReducer;
