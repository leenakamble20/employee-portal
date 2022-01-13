import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useRef, useContext } from "react";
import { EmployeeContext } from "./Home";

export default function SearchBar() {
    const searchInput = useRef('');

    const { employees, data, doSearch } = useContext(EmployeeContext);
    return <Form>
        <InputGroup className="mb-3">
            <InputGroup.Text id="search">Search</InputGroup.Text>
            <FormControl ref={searchInput}
                onChange={() => doSearch(searchInput.current.value)}
                placeholder="Search by Name or Location"
                aria-label="Search"
                aria-describedby="search"
            />
        </InputGroup>
        <p>Showing records {data.length} of {employees.length} </p>
    </Form>
}