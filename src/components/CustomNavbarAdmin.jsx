// import React, { useEffect, useState } from 'react';
// import { NavLink as ReactLink } from 'react-router-dom';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap';
// import { getCurrentUserDetail, isLoggedIn, isAdmin } from '../auth';
// import { useNavigate } from "react-router-dom";
// import { doLogout } from '../auth';

// function CustomNavbarAdmin(args) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [login, setLogin] = useState(false);
//   const [isAdminUser, setIsAdminUser] = useState(false);
//   const [user, setUser] = useState(undefined);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLogin(isLoggedIn());
//     setIsAdminUser(isAdmin());
//     setUser(getCurrentUserDetail);
//   }, [login, isAdminUser]);

//   const logout = () => {
//     doLogout(() => {
//       //logged out
//       setLogin(false)
//       navigate("/login")
//     })
//   }


//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <Navbar color="dark" dark expand="md" fixed="" className="px-5">
//         <NavbarBrand tag={ReactLink} to="/admin/dashboard">TravelMate</NavbarBrand>
//         <NavbarToggler onClick={toggle} />

//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="me-auto" navbar>
//             <NavItem>
//               <NavLink tag={ReactLink} to="/admin/dashboard">Home</NavLink>
//             </NavItem>
//             {
//               (login && isAdminUser) && (
//                 <>
//                  <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/cities  ">
//                       Cities
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/packages">
//                       Packages
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/hotels">
//                       Hotel
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/flights">
//                       Flight
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/activities">
//                       Activities
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/bookings  ">
//                       Bookings
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/payments  ">
//                       Payments
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/admin/users  ">
//                       Users
//                     </NavLink>
//                   </NavItem>
//                 </>
//               )
//             }
//           </Nav>



//           <Nav navbar>
//             {
//               login && (
//                 <>
//                   <NavItem>
//                     <NavLink href="#">
//                       Hello {user.name}
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>
//                     <NavLink href="#" onClick={logout}>
//                       Logout
//                     </NavLink>
//                   </NavItem>

//                 </>
//               )
//             }

//             {

//               !login && (
//                 <>
//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/login">
//                       Login
//                     </NavLink>
//                   </NavItem>

//                   <NavItem>
//                     <NavLink tag={ReactLink} to="/signup">
//                       Signup
//                     </NavLink>
//                   </NavItem>
//                 </>
//               )
//             }


//           </Nav>
//         </Collapse>
//       </Navbar>
//     </>
//   );
// }

// export default CustomNavbarAdmin;
// CustomNavbarAdmin.js

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
} from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn, isAdmin } from '../auth';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../auth';
import './CustomNavbarAdmin.css'; // Import your custom CSS for styling

function CustomNavbarAdmin(args) {
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
      setLogin(false);
      navigate('/login');
    });
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="custom-navbar" expand="md" dark style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/background_admin.jpg)`,
      backgroundSize: 'cover',
    }}>
      <NavbarBrand tag={ReactLink} to="/admin/dashboard">
        TravelMate
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/admin/dashboard">
              Home
            </NavLink>
          </NavItem>
          {login && isAdminUser && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/cities">
                  Cities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/packages">
                  Packages
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/hotels">
                  Hotel
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/flights">
                  Flight
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/activities">
                  Activities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/bookings">
                  Bookings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/payments">
                  Payments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/users">
                  Users
                </NavLink>
              </NavItem>
            </>
          )}
          {login ? (
            <>
              <NavItem style={{float:'inline-end'}}>
                <NavLink className="nav-link user-greeting" >
                  Hello, {user && user.name}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link logout-link" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
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
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbarAdmin;
