import { combineReducers } from "redux";
import {userReducer} from "./userReducer";
import {snackbarReducer} from "./snackbarReducer";

export const rootReducer = combineReducers({
    login: userReducer,
    snackbar: snackbarReducer,
});
