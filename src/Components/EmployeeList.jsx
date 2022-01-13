import { Table } from "react-bootstrap";
import { EmployeeContext } from "./Home";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Trash } from 'react-bootstrap-icons';
import { connect } from "react-redux";
import { deleteEmployee } from '../actions/action-creator';
import { bindActionCreators } from "redux";

function EmployeeList({ deleteEmployee }) {

    const { data } = useContext(EmployeeContext);

    function handleDelete(locId, empCode, e) {
        //console.log(locId,empCode);
        if (window.confirm('Do you want to delete the item?')) {
            deleteEmployee(locId, empCode);
        }
    }
    return <React.Fragment>
        <Link to="/employee/create" className="btn btn-success">Add employee</Link>

        <Table responsive>
            <thead>
                <tr>
                    <th>Location Id</th>
                    <th>EmpCode</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((employee, index) =>
                    <tr key={index}>
                        <td>{employee.LocationId}</td>
                        <td>{employee.EmpCode}</td>
                        <td>{employee.Name}</td>
                        <td>{employee.Department}</td>
                        <td>{employee.Designation}</td>
                        <td>
                            <Link to={`/employees/loc/${employee.LocationId}/empCode/${employee.EmpCode}`}>Details</Link>
                        </td>
                        <td>
                            <Trash className="trash-style" onClick={(e) => handleDelete(employee.LocationId, employee.EmpCode, e)} />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </React.Fragment>
}


function mapDispatchToProps(dispatch) {
    let actionMap = {
        deleteEmployee
    }
    return bindActionCreators(actionMap, dispatch);
}
export default connect(null, mapDispatchToProps)(EmployeeList);