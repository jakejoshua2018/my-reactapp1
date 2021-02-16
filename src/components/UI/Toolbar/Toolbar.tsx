import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Toolbar = (props: any) => {

  return (
    <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
            <LinkContainer to='/' exact>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/services'>
                <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/product'>
                <Nav.Link>Products</Nav.Link>
            </LinkContainer>
        </Nav>
    </Navbar>
  );
}

export default Toolbar;
