import { combineReducers } from "redux";
import {userReducer} from "./userReducer";
import {snackbarReducer} from "./snackbarReducer";
import {movieReducer} from "./movieReducer";
import {movieListReducer} from "./movieListReducer";

export const rootReducer = combineReducers({
    login: userReducer,
    snackbar: snackbarReducer,
    movieList: movieListReducer,
    movie: movieReducer,
});
