import React, { Component } from 'react';
import {
    Container, Row, Col, Navbar, Nav,
    NavLink, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';

export default class NavBar extends Component {
  render() {

    return (
      <div>
        <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
    
            <Container>
                <Row noGutters className="position-relative w-100 align-items-center">
                
                <Col className="d-none d-lg-flex justify-content-start">
                    <Nav className="mrx-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/">Currency Converter 2.0</NavLink>
                          </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                          <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/exchange1.0">[Depricated] Currency Converter</NavLink>
                          </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                          <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/card-game">Win!</NavLink>
                          </NavItem>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    
                    </Nav>
                </Col>
                
                </Row>
            </Container>
            
        </Navbar>
      </div>
    )
  }
}
