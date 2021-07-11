import { combineReducers } from "redux";
import {FORDEVONLY_usersReducer} from "./FORDEVONLY_userReducer";
import {loginOutReducer} from "./loginOutReducer";
import {registerReducer} from "./registerReducer";

export const rootReducer = combineReducers({
    FORDEVONLY_users: FORDEVONLY_usersReducer,
    login: loginOutReducer,
    register: registerReducer
});
