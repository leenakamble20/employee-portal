import { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
//import { addEmployee } from "../services/EmployeeService";
import { Navigate } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {addEmployee} from '../actions/action-creator'

class EmployeeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: {
                EmpCode: '', Name: '', LocationId: '',
                Age: '10', Location: '', Designation: '', Department: ''
            },
            errors: {
                EmpCode: '', Name: '', LocationId: '',
                Age: '', Location: '', Designation: '', Department: ''
            },
            message: "",
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
        //console.log(e.target.name,e.target.value);
        const { name, value } = e.target
        this.setState({ employee: { ...this.state.employee, [name]: value } });
        let err = "";
        switch (name) {
            case "EmpCode":
                if (value.length != 4) {
                    err = "Employee Code must be 4 character"
                }
            case "Name":
                let exist = false;
                for (var ch of value) {
                    if (["!", "@", "#", "$", "%", "^", "&", "*",].indexOf(ch) >= 0) {
                        exist = true;
                    }
                }
                if (exist) {
                    err = "Employee Name should not have speacial character";
                }
        }

        this.setState({ errors: { ...this.state.errors, [name]: err } });

        //this.setState({[e.target.name] : e.target.value});

    }

    async handleSubmit(e) {
        e.preventDefault();
       // let result = await addEmployee(this.state.employee).catch(err => { console.log(err) });
       
        // if (result) {
        //     this.setState({ message: "Employee added successfully" });
        //     this.setState({ redirect: true });
        // }

        console.log(this.state.employee);
        this.props.addEmployee(this.state.employee);
        this.setState({ redirect: true });
    }


    render() {
        if (this.state.redirect) {
            return <Navigate to={"/"}></Navigate>
        }
        return <Container>
            <Row>
                <Col className="col-md-6 mx-auto">
                    <h2>Employee Create</h2>
                    <p>{this.state.message}</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="empCode">
                                    <Form.Label>Employee code </Form.Label>
                                    <Form.Control type="text" name="EmpCode" value={this.state.employee.EmpCode} onChange={this.handleChange} placeholder="Enter employee code" required />
                                    {this.state.errors.EmpCode}

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="Name" value={this.state.employee.Name} onChange={this.handleChange} placeholder="Enter employee name" />
                                    {this.state.errors.Name}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="number" name="Age" value={this.state.employee.Age} onChange={this.handleChange} placeholder="Enter employee age" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="designation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control type="text" name="Designation" value={this.state.employee.Designation} onChange={this.handleChange} placeholder="Enter designation" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="department">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" name="Department" value={this.state.employee.Department} onChange={this.handleChange} placeholder="Enter department" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="locId">
                                    <Form.Label>Location ID</Form.Label>
                                    <Form.Control type="text" name="LocationId" value={this.state.employee.LocationId} onChange={this.handleChange} placeholder="Enter location ID" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" name="Location" value={this.state.employee.Location} onChange={this.handleChange} placeholder="Enter location" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Submit
        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    }
}


function mapDispatchToProps(dispatch) {
    let actionMap = {
        addEmployee
    }
    return bindActionCreators(actionMap, dispatch);
}

export default connect(null,mapDispatchToProps)(EmployeeForm);