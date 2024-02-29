import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
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
} from "reactstrap";
import { getUserById, updateUser } from "../../../services/user-service";
import BaseAdmin from "../../../components/BaseAdmin";


const EditUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
      name: "",
      email: "",
      gender: "",
      dob: "",
      mobileNumber: 0,
      activeStatus: false,
  });

  const { userId } = useParams();

  useEffect(() => {
    getUser(userId);
  }, [])
 
  const handleChange = (event, property) => {
    
      setUserData({ ...userData, [property]: event.target.value });
    
  };
  const getUser = (userId) => {
    console.log(userData);
    getUserById(userId).then(data => {
      console.log(data);
      setUserData({ ...data })
    }).catch((error) => {
      console.log("error");
      console.log("Error log");
      toast.error("Eror while Edit");
    })
  }
  
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  
  const updateUserData = (event) => {
    
    console.log(userData);
    {
      updateUser(userId,userData)
      .then((resp) => {
        console.log("insideUpdate");
        console.log(resp);
        console.log("User Updated successfully");
          toast.success("User Updated successfully");
         // resetActivityData();
          navigate("/admin/Users");
        })
        .catch((error) => {
          console.log("Error log" + error);
          toast.error("Eror while updating data of user");
          setError({
            errors: error,
            isError: true,
          });
        });
      }
  };

  return (
    <>
      <BaseAdmin>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}> 
              <CardHeader>
                <h3>Edit User</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="userId">Customer ID</Label>
                        <Input
                          id="userId"
                          name="userId"
                          type="text"
                          value={userData.userId}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">Customer Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          onChange={(e) => handleChange(e, "name")}
                          value={userData.name}
                        >
                         
                        </Input>
                      </FormGroup>
                    </Col> 
                  
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                       
                          value={userData.email}
                        
                          onChange={(e) => handleChange(e, "email")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="gender">Gender</Label><br></br>
                        <Input id="gender" name="gender" type="radio"/>Male
                        {"   "}<Input id="gender" name="gender" type="radio"/>Female
                      </FormGroup>
                    </Col>
                  </Row> 
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="dob"> Date of Birth </Label>
                        <Input
                          id="dob"
                          name="dob"
                         // placeholder="Enter Rate per person"
                          type="date"
                          onChange={(e) => handleChange(e, "dob")}
                          value={userData.dob}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="mobileNumber">Mobile Number</Label>
                        <Input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="number"
                          onChange={(e) => handleChange(e, "mobileNumber")}
                          value={userData.mobileNumber}
                        >
                        </Input>
                      </FormGroup>
                    </Col> 
                    </Row>
                      <div className="text-center">
                        <Button color="primary" onClick={updateUserData}>
                          Update User
                        </Button>
                        <Button
                          className="ms-5"
                          color="danger"
                          tag={ReactLink}
                          to="/admin/users"
                        >
                          Cancel
                        </Button>
                       
                      </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BaseAdmin>
    </>
  );
};

export default EditUser;
