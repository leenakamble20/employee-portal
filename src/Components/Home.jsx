import { Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import { getEmployees } from '../services/EmployeeService'
import EmployeeList from './EmployeeList'
import SearchBar from './SearchBar'
import { connect } from "react-redux";
import { loadEmployees } from "../actions/action-creator";

export const EmployeeContext = React.createContext();
class Home extends Component {

    constructor(props) {
        super(props);
        console.log(props.employees);
        this.state = {
            employees: props.employees,
            filteredResult: props.employees
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    async componentDidMount() {
        // let employees = await getEmployees().catch(err => { console.log(err) });
        // this.setState({ employees filteredResult: employees }); //equivalent to {employess:employees}


    }

    //lifecycle method  which is called automatically after constructor or when props change
    static getDerivedStateFromProps(newProps, oldState) {
        if (newProps.employees.length != oldState.employees.length) {
            return {
                employees: newProps.employees,
                filteredResult: newProps.employees
            }
        } return null;
    }

    handleSearch(searchText) {
        if (searchText && searchText.length > 0) {
            searchText = searchText.toUpperCase();
            let filteredResult = this.state.employees.filter((item) => item.Name.toUpperCase().indexOf(searchText) >= 0
                || item.Location.toUpperCase().indexOf(searchText) >= 0)
            this.setState({ filteredResult });
        } else {
            this.setState({ filteredResult: this.state.employees });
        }

    }

    render() {
        return <EmployeeContext.Provider value={{ employees: this.state.employees, data: this.state.filteredResult, doSearch: this.handleSearch }}>
            <Container>
                <Row>
                    <Col>
                        <h2>Home</h2>
                        <SearchBar />
                        <EmployeeList />
                    </Col>
                </Row>
            </Container>
        </EmployeeContext.Provider>
    }
}

//Map reduxstore state values to properties of component
function mapStateToProps(state) {
    return { employees: state.employeeState.employees }
}
// async function mapDisptachToProps(dispatch) {
//     let actionMap ={
//         loadEmployees

//     }
//     //let employees = await getEmployees().catch(err => { console.log(err) });
//     return dispatch(loadEmployees(employees));
// }
export default connect(mapStateToProps)(Home);
//export default connect(mapStateToProps, mapDisptachToProps)(Home);