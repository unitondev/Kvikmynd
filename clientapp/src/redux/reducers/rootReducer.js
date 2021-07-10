import { combineReducers } from "redux";
import {usersReducer} from "./userReducer";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    login: loginReducer,
    register: registerReducer
});
