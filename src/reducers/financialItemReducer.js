import * as types from "../actions/types";

const initialState = {
    financialItem: null
};

export default function stockInfo(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_FINANCIAL_ITEM) {
        return{
            ...state,
            financialItem: payload
        };
    } else {
        return state
    }
}