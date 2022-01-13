import * as ActionTypes from './action-types'
import axios from 'axios';

const API_URL = process.env.REACT_APP_EMPLOYEE_API_URL

export function loadEmployees(employees) {

    return async (dispatch) => {
        try {
            let result = await axios.get(API_URL);
            dispatch({
                type: ActionTypes.GET_EMPLOYEES,
                payload: result.data
            })
            return Promise.resolve(result.data);
        } catch (ex) {
            return Promise.reject(ex)
        }
    }
    // return {
    //     type: ActionTypes.GET_EMPLOYEES,
    //     payload: employees
    // }
}

export function addEmployee(employee) {

    return async (dispatch) => {
        try {
            let result = await axios.post(API_URL,employee);
            dispatch({
                type: ActionTypes.ADD_EMPLOYEE,
                payload: employee
            })
            return Promise.resolve(result.data);
        } catch (ex) {
            return Promise.reject(ex)
        }
    }

    // return {
    //     type: ActionTypes.ADD_EMPLOYEE,
    //     payload: employee
    // }
}

export function deleteEmployee(locId, empCode) {

    return async (dispatch) => {
        try {
            let result = await axios.delete(`${API_URL}/location/${locId}/employee/${empCode}`);
            dispatch({
                type: ActionTypes.DELETE_EMPLOYEE,
                payload: { locId, empCode }
            })
            return Promise.resolve(result.data);
        } catch (ex) {
            return Promise.reject(ex)
        }
    }

    // return {
    //     type: ActionTypes.DELETE_EMPLOYEE,
    //     payload: { locId, empCode }
    // }
}

export function getEmployee(locId, empCode) {

    return async (dispatch) => {
        try {
            let result = await axios.get(`${API_URL}/location/${locId}/employee/${empCode}`);
            //console.log(result.data);
            dispatch({
                type: ActionTypes.GET_EMPLOYEE,
                payload: result.data
            })
            return Promise.resolve(result.data);
        } catch (ex) {
            return Promise.reject(ex)
        }
    }

    // return {
    //     type: ActionTypes.ADD_EMPLOYEE,
    //     payload: employee
    // }
}
