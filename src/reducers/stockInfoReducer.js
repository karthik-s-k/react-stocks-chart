import * as types from "../actions/types";

const initialState = {
    stockInfo: null
};

export default function stockInfo(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_STOCK_INFO) {
        return{
            ...state,
            stockInfo: payload
        };
    } else {
        return state
    }
}