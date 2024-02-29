import React, { useState, useEffect } from 'react'
import BaseAdmin from '../../../components/BaseAdmin'
import Dashboard from '../Dashboard/Dashboard'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { getAllUsers,deactivateUser as deactivateUserService, reactivateUser as reactivateUserService  } from '../../../services/user-service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
    const[users,setUsers]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
      }, []);
      const getUsers=(event)=>{
          getAllUsers()
          .then((resp)=>{
              console.log(resp);
              setUsers(resp);
          })
      }
    const viewUser=(userId)=>{
        console.log(userId+"view");
        navigate(`/admin/viewUser/${userId}`);
    };
    const editUser =(userId)=>{
        console.log(userId + "edit");
        navigate(`/admin/editUser/${userId}`);
    };

    const deactivateUser = (userId) => {
        deactivateUserService(userId)
        .then((resp) => {
            console.log(resp);
            toast.success('User deactivated successfully'); // Display success toast
            updateUserStatus(userId, false);
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to deactivate user'); // Display error toast
        });
    };

    const reactivateUser = (userId) => {
        reactivateUserService(userId)
        .then((resp) => {
            console.log(resp);
            toast.success('User reactivated successfully'); // Display success toast
            updateUserStatus(userId, true);
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to reactivate user'); // Display error toast
        });
    };

    const updateUserStatus = (userId, activeStatus) => {
        setUsers(prevUsers => {
            return prevUsers.map(user => {
                if (user.userId === userId) {
                    return { ...user, activeStatus };
                }
                return user;
            });
        });
    };
    
    return (
        <>
           <BaseAdmin>
               <Container>
                   <Row className="mt-4">
                       <Col md={8}>
                       <h3>Users</h3>
                       </Col>
                   </Row>
               </Container>
               <Container>
                   <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            <thead>
                                <tr className="text-center">
                                    <th>Customer Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Mobile Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {users?.map((user, i) => {
                                        const isUserActive = user.activeStatus; // Adjust this based on your user data structure
                                        console.log('user status =',isUserActive);
                                        return (
                                        <tr id={user.userId} key={i} >
                                            
                                            <td align="right">CS{user.userId}</td> 
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td align="right">{user.dob}</td>
                                            <td align="right">+91{user.mobileNumber}</td>
                                            <td>
                                                <div className="text-center">
                                                    <Button color="primary" onClick={() => viewUser(user.userId)}>
                                                        View
                                                    </Button>
                                                    <Button className="ms-4" color="info" onClick={() => editUser(user.userId)}>
                                                        Edit User
                                                    </Button>
                                                    <Button
                                                        className="ms-4"
                                                        color="info"
                                                        onClick={() => deactivateUser(user.userId)}
                                                        disabled={!isUserActive} // Disable if user is inactive
                                                    >
                                                        Deactivate User
                                                    </Button>
                                                    <Button
                                                        className="ms-4"
                                                        color="info"
                                                        onClick={() => reactivateUser(user.userId)}
                                                        disabled={isUserActive} // Disable if user is active
                                                    >
                                                        Reactivate User
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                    );
                                })}
                            </tbody>
                   </Table>
               </Container>
           </BaseAdmin>
        </>
    )
}

export default Users;