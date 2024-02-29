import React, { useEffect, useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn, isAdmin } from '../auth';
import { useNavigate } from "react-router-dom";
import { doLogout } from '../auth';
import img from "../assets/Logo.jpeg"
function CustomNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    setLogin(isLoggedIn());
    setIsAdminUser(isAdmin());
    setUser(getCurrentUserDetail);
  }, [login, isAdminUser]);

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false)
      // userContextData.setUser({
      //     data: null,
      //     login: false
      // })

      navigate("/login")
    })
  }


  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar expand="md" fixed="" style={{backgroundColor:'lightcyan'}}> 
        <img style={{height:150, width:150,opacity:0.9}} src={img}></img>
        <NavbarBrand tag={ReactLink} to="/" style={{fontSize:60}}>TravelMate</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar style={{fontSize:25}}>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact">Contact</NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">Services</DropdownItem>
                <DropdownItem>Contact Up</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar style={{fontSize:25}}>
            {
              login && (
                <>
                   <NavItem>
                    <NavLink href="/loggedIn/profile"> 
                    Hello {user.name}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/loggedIn/bookings"> 
                      Bookings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={logout}> 
                      Logout
                    </NavLink>
                  </NavItem>
                </>
              )
            }

            {

              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={ReactLink} to="/signup">
                      Signup
                    </NavLink>
                  </NavItem>
                </>
              )
            }


          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;