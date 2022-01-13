import * as ActionTypes from '../actions/action-types';

//let sampleData = [{ LocationId: 'MUM', EmpCode: '101' }, { LocationId: 'MUM', EmpCode: '102' }]

const initialState = {
    employees: [],
    employee: undefined
}

function employeeReducer(state = initialState, action) {
    console.log(action);
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.GET_EMPLOYEES:
            return { ...state, employees: payload }
        case ActionTypes.ADD_EMPLOYEE:
            return { ...state, employees: [...state.employees, payload] }
        case ActionTypes.DELETE_EMPLOYEE:
            let deletedItem = state.employees.find(item => item.LocationId === payload.locId && item.EmpCode === payload.empCode)
            // console.log(deletedItem);
            return { ...state, employees: state.employees.filter(item => item != deletedItem) }
        case ActionTypes.GET_EMPLOYEE:
            return { ...state, employee: payload }
        default:
            return state;

    }

}

export default employeeReducer