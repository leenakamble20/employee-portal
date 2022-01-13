import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import EmployeeDetail from './Components/EmployeeDetail';
import EmployeeForm from './Components/EmployeeForm';

import { Navbar, Nav, Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadEmployees} from './actions/action-creator'

function App({loadEmployees}) {
  loadEmployees();
  return (
    <Router>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">{process.env.REACT_APP_APPLICATION_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/employees/loc/:locId/empCode/:empCode" element={<EmployeeDetail/>}></Route>
          <Route exact path="/employee/create" element={<EmployeeForm/>}></Route>
        </Routes>
      </div>

    </Router>
  );
}

function mapDispatchToProps(dispatch){
let map = {
  loadEmployees
}
return bindActionCreators(map,dispatch);
}
export default connect(null,mapDispatchToProps)(App);
