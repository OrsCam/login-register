import { SET_CURRENT_USER } from "../actions/types";
import { action } from "../actions/types";

const initialState = {
    validToken: false,
    user: {},
};

const booleanActionPayload = (payload) => {
    if (payload) {
        return true;
    } else {
        return false;
    }
};

export default function (state = initialState, actions) {
    switch (actions.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload,
            };

        default:
            return state;
    }
}