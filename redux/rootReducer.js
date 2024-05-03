
import { combineReducers } from 'redux';
import counterReducer from './reducers/authSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
