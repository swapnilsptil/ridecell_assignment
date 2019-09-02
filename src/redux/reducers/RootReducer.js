import { combineReducers } from "redux";

import UserReducer from './Reducer';

const rootReducer = combineReducers({
    user: UserReducer
});

export default rootReducer;