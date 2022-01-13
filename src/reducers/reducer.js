import { combineReducers } from "redux";
import employeeReducer from './employee-reducer';

const rootReducer = combineReducers({
    employeeState: employeeReducer
    //Add more reducer
    //compplaintSatte : complaintsReducer
})

export default rootReducer