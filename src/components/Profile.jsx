import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink as ReactLink } from "react-router-dom";
import { toast } from 'react-toastify';
import Footer from './Footer';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";import {getUserById,updateUser} from "../services/user-service";
import Base from './base'

const Profile = () => {
  const [userData,setUserData]=useState({
    name: "",
    email:"",
    gender:"",
    dob:"",
    mobileNumber:+91,
    guests:[]
});
    useEffect(() => {
        getUser(localStorage.getItem("userId"));
    }, []);
    const getUser = (userId) => {
      console.log(userData);

      getUserById(userId).then(data => {
          console.log(data);
          setUserData({ ...data })
      }).catch((error) => {
          console.log("error");
          console.log("Error log");
          toast.error("Eror while signup");
      })
  }
const handleChange=(event,property)=>{
  setUserData({ ...userData, [property]: event.target.value });
}
const navigate = useNavigate();
const updateUserData = (event) => {
  console.log(userData);
    updateUser(localStorage.getItem("userId"),userData)
      .then((resp) => {
        console.log(resp);
        console.log("User Updated successfully");
        toast.success("User Updated successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
      });
};
  return (
    <>
    <Base >
    <Row className='mt-4'>
      <Col sm={{size:5}}></Col>
      <Card>
        <CardHeader>PROFILE PAGE</CardHeader>
        <CardBody>
          <Form style={{marginLeft:100,marginRight:100}}>
            <Row>
              <Col md={6}>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Your name"
                  type="text"
                  value={userData.name}
                  onChange={(e)=>handleChange(e,"name")}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  type="text"
                  value={userData.email}
                  onChange={(e)=>handleChange(e,"email")}
                ></Input>
              </Col>
              <Col md={6}>
                <Label for="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter Your mobileNumber"
                  type="text"
                  value={userData.mobileNumber}
                  onChange={(e)=>handleChange(e,"mobileNumber")}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="gender">Gender</Label>
                <Input
                  id="name"
                  name="gender"
                  placeholder="Select Your gender"
                  type="select"
                  value={userData.gender}
                  onChange={(e)=>handleChange(e,"gender")}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input></Col>
               
              <Col md={6}>
                <Label for="don">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="Enter Your Dob"
                  type="date"
                  value={userData.dob}
                  onChange={(e)=>handleChange(e,"dob")}
                ></Input>
              </Col>
            </Row><br></br>
            <Row>
              
            <div className="text-center">
                    <Button color="primary" onClick={updateUserData}>
                      Save
                    </Button>
                    
                    <Button
                      className="ms-5"
                      color="danger"
                      tag={ReactLink}
                      to="/home"
                    >
                      Cancel
                    </Button>

                  </div>
                  
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Row>
              <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Footer ></Footer>
    </Base></>
  )
};
export default Profile;