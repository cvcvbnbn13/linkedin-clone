import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articleReducer from './articleReducer';

const reducers = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
});

export default reducers;
