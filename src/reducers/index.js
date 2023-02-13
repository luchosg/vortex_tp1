import { combineReducers } from "redux";
import employeesReducer from "./employeesReducer";

export default combineReducers({
    rrhh: employeesReducer
})