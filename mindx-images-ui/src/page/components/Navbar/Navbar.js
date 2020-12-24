import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Mindx Images</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#link">Signup</Nav.Link>
                    <NavDropdown title="Welcome" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Upload</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default CustomNavbar;