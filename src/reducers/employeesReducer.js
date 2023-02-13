import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from "../actions/types";
import {initialEmployeesList} from './initialState';

const initialState = {
    employees: initialEmployeesList,
    nextId: [initialEmployeesList.length]
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_EMPLOYEE:
            return {...state, 
                nextId: state.nextId.length > 1 ? 
                    [...state.nextId.slice(1)] :
                    [state.nextId[0]+1], 
                employees: [...state.employees, action.payload]}
        case DELETE_EMPLOYEE:
            return {...state,
                nextId: [...state.nextId, action.payload].sort(),
                employees: state.employees.filter(employee => employee.id !== action.payload)}
        case EDIT_EMPLOYEE:
            return {...state, employees: state.employees.map(
                employee => employee.id === action.payload.id  ? action.payload : employee)}
        default:
            return state
    }
}

export default employeesReducer;


