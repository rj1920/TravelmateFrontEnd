import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/base";
import { signup } from "../services/user-service";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    dob: "",
    gender: "",
    activeStatus: true,
    role: "ROLE_CUSTOMER",
  });

  useEffect(() => {}, [data]);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const navigate = useNavigate();

  //Resetting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      dob: "",
      gender: "male",
      activeStatus: true,
      role: "ROLE_CUSTOMER",
    });
  };

  //Submit the form
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    //validate Data
    // if (error.isError) {
    //   toast.error("Form data is invalid. Correct first & then submit");
    //   setError({...error,isError:false});
    //   return;
    // }

    if(data.dob === ""){
      setError({
        errors: "Date of  birth is empty",
        isError: true,
      });    
  
    }

    //Call server API for signup
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is register successfully");
        resetData();
        navigate("/login");
      })
      .catch((error) => {
        console.log("error");
        console.log("Error log");
        toast.error("Eror while signup");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <>
      <Base>
        <Container>
          <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card color="light" style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                <CardHeader>Fill info to register</CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    {/* Name Field */}

                    <FormGroup
                      invalid={
                        error.errors?.response?.data?.message ? true : false
                      }
                    >
                      <FormFeedback>
                        {error.errors?.response?.data?.message}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter Full Name"
                        type="text"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.errors?.response?.data?.message ? true : false
                        }
                      />
                    </FormGroup>
                    <FormFeedback>
                      {error.errors?.response?.data?.message}
                    </FormFeedback>

                    {/* Date of Birth Field */}
                    <FormGroup>
                      <Label for="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        name="dob"
                        placeholder="Enter Date of Birth"
                        type="date"
                        onChange={(e) => handleChange(e, "dob")}
                        value={data.dob}
                      />
                    </FormGroup>

                    {/* Gender Field */}
                    <Label for="dob">Gender</Label>
                    <FormGroup gender>
                      <Row>
                        <Col sm="2">
                          <Input
                            name="gender"
                            id="gender"
                            type="radio"
                            value="Male"
                            onChange={(e) => handleChange(e, "gender")}
                          />{" "}
                          <Label gender>Male</Label>
                        </Col>

                        <Col sm="2">
                          <Input
                            name="gender"
                            id="gender"
                            type="radio"
                            value="Female"
                            onChange={(e) => handleChange(e, "gender")}
                          />{" "}
                          <Label gender>Female </Label>
                        </Col>

                        <Col sm="2">
                          <Input
                            name="gender"
                            id="gender"
                            type="radio"
                            value="Other"
                            onChange={(e) => handleChange(e, "gender")}
                          />{" "}
                          <Label gender>Other </Label>
                        </Col>
                      </Row>
                    </FormGroup>

                    {/* Mobile Number Field */}
                    <FormGroup>
                      <Label for="mobileNumber">Mobile Number</Label>
                      <Input
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                        type="number"
                        onChange={(e) => handleChange(e, "mobileNumber")}
                        value={data.mobileNumber}
                      />
                    </FormGroup>

                    {/* Email Field */}
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                      />
                    </FormGroup>

                    {/* Password */}
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                      />
                    </FormGroup>
                    <Container className="text-center">
                      <Button color="dark"> Register </Button>
                      <Button
                        color="secondary"
                        className="ms-2"
                        type="reset"
                        onClick={() => resetData()}
                      >
                        {" "}
                        Reset{" "}
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
};

export default Signup;
