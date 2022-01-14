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
import { loadEmployees } from './actions/action-creator'

//amplify packages
import { Amplify } from 'aws-amplify'
import { Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsEXports from './aws-exports';
Amplify.configure(awsEXports);

function App({ loadEmployees }) {
  loadEmployees();
  return (<>
    <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
    <Authenticator loginMechanisms={['username']}>
    {({signOut,user})=>(
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
              
              <Nav.Link onClick={signOut}>SignOut</Nav.Link>
              <Nav.Link> Welocme {user.username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/employees/loc/:locId/empCode/:empCode" element={<EmployeeDetail />}></Route>
          <Route exact path="/employee/create" element={<EmployeeForm />}></Route>
        </Routes>
      </div>

    </Router>
    )}
    </Authenticator>
    </>);
  
}

function mapDispatchToProps(dispatch) {
  let map = {
    loadEmployees
  }
  return bindActionCreators(map, dispatch);
}
export default connect(null, mapDispatchToProps)(App);
