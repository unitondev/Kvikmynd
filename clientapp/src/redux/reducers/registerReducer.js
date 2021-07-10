import {handleActions} from "redux-actions";
import {registerRequestFailed, registerRequestSuccess} from "../actions";

const iniState = {
    isRegisterComplete: false,
    message: ''
}

export const registerReducer = handleActions(
    {
        [registerRequestSuccess] : (state, action) => ({
            isRegisterComplete: true,
            message: action.payload.message
        }),
        [registerRequestFailed]: (state, action) => ({
            isRegisterComplete: false,
            message: action.payload
        })
    }, iniState);