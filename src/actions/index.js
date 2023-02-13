import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from "./types"

export const createEmployee = employee => {
    return {
        type: CREATE_EMPLOYEE,
        payload: employee
    }
}

export const deleteEmployee = id => {
    return {
        type: DELETE_EMPLOYEE,
        payload: id
    }
}

export const editEmployee = employee => {
    return {
        type: EDIT_EMPLOYEE,
        payload: employee
    }
}
