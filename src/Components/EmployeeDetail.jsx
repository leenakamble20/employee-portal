import { useParams } from "react-router";
//import { getEmployee } from "../services/EmployeeService";
import React,{ useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getEmployee } from '../actions/action-creator';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function EmployeeDetail({getEmployee, employee}) {

    const { locId, empCode } = useParams();
    //const [employee, setEmployee] = useState();
    useEffect(() => {
        async function fetchEmployee() {
          //  let employee = await getEmployee(locId, empCode).catch(err => console.log(err));
          getEmployee(locId, empCode);
            //console.log(employee)
            //setEmployee(employee);
        }
        fetchEmployee();
    }, [locId, empCode]); //if locId or epmCode is updated then only useEffect will execute

    return <React.Fragment>{employee && createTable()}</React.Fragment>

function createTable(){
    return <Container><Row>
    <Col className="col-md-6 mx-auto">
        <Table bordered striped hover>
            <thead>
                <tr>
                    <th colSpan="2"><h3>Employee Details</h3></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{employee.Name}</td>
                </tr>
                <tr>
                    <th>Employee Code</th>
                    <td>{employee.EmpCode}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{employee.Age}</td>
                </tr>
                <tr>
                    <th>Department</th>
                    <td>{employee.Department}</td>
                </tr>
                <tr>
                    <th>Designation</th>
                    <td>{employee.Designation}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>{employee.Location}</td>
                </tr>
            </tbody>
        </Table>
    </Col>
</Row>
</Container>
}
}

function mapStatetoProps(state){
    return {
        employee : state.employeeState.employee
    }
}

function mapDispatchToProps(dispatch){

    let map = {
        getEmployee
    }
    return bindActionCreators(map,dispatch);
}

export default connect(mapStatetoProps,mapDispatchToProps)(EmployeeDetail);