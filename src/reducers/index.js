import {combineReducers} from "redux";
import stockInfo from './stockInfoReducer';
import financialItem from './financialItemReducer';

export default combineReducers({
    stockInfo,
    financialItem
})