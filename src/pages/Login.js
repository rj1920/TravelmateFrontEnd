import React, { useState } from "react";
import Base from "../components/base";
import { toast } from "react-toastify";
import { signin } from "../services/user-service";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { doLogin, isAdmin, setId } from "../auth";
import { GoogleLoginButton } from "react-social-login-buttons";
const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
  };

  //Submit the form
  const submitForm = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    //Validate
    if (loginDetail.email.trim() === "" || loginDetail.password.trim() === "") {
      toast.error("Username or Password  is required !!");
      return;
    }

    //Call server API for Signin
    signin(loginDetail)
      .then((jwtToken) => {
        console.log(jwtToken);
        console.log("success log");
        toast.success("User is login successfully");
        //save the data to localstorage
        doLogin(jwtToken, () => {
          localStorage.setItem("userId", setId());
          console.log("login detail is saved to localstorage");
        });

        if (isAdmin()) {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }




        // resetData();




      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error("Authentication Fails");
        } else {
          toast.error("Something went wrong on sever !!");
        }
      });
  };

  return (
    <>
      <Base>
        <Container>
          <Row className="mt-4">
            <Col
              sm={{
                size: 6,
                offset: 3,
              }}
            >
              <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                <CardHeader className="text-center">
                  <h3>Login Here</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        value={loginDetail.email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        value={loginDetail.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button color="primary"> Login </Button>
                      <Button
                        color="secondary"
                        className="ms-2"
                        type="reset"
                        onClick={handleReset}
                      >
                        {" "}
                        Reset{" "}
                      </Button>
                    </Container>
                    <div className="text-center mt-3 mb-0">New User <a href="/signup">Register Here</a></div>
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

export default Login;