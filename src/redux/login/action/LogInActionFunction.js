import *  as ActionTypes from "./LogInAction";

export const setUserData = (value) => ({
    type: ActionTypes.USER_DATA,
    payload: value
});