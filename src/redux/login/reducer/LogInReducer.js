import * as ActionType from "../action/LogInAction";

const initialState = {
    isLogIn: false,
    userdata: {}
}

function LogInReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.USER_LOG_IN:
            return { ...state, isLogIn: true }
        case ActionType.USER_LOG_OUT:
            return { ...state, isLogIn: false , userdata:{} }
        case ActionType.USER_DATA:
            return { ...state, userdata: action.payload }
        default:
            return state;
    }
}

export default LogInReducer;