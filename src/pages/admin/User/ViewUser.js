import { useState, useEffect } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import BaseAdmin from "../../../components/BaseAdmin";
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
import { getUserById } from "../../../services/user-service";
import { toast } from "react-toastify";


const ViewUser=()=>{

    const [userData,setUserData]=useState({
        name: "",
        email:"",
        gender:"",
        dob:"",
        mobileNumber:+91,
    });

    const { userId } = useParams();
    
        useEffect(() => {
            getUser(userId);
        },[])

    const getUser =(userId)=>{
        console.log(userData);
        
        getUserById(userId).then(data =>{
            console.log(data);
            setUserData({ ...data })
        }).catch((error)=>{
            console.log("error");
            console.log("Error Log");
            toast.error("Error while View");
        })
    }
    
    return(
        <BaseAdmin>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
              <CardHeader>
                <h3>View User</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">User Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={userData.name}
                         disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="text"
                          value={userData.email}
                          disabled
                        >
                        </Input>
                      </FormGroup>
                    </Col> 
                    
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                      <Label check for="gender"> Gender
                      {/* Male <Input id="gender" name="gender" type="radio" defaultChecked></Input>
                      Female <Input id="gender" name="gender" type="radio" ></Input> */}
                      <Input id="gender" type="text" name="gender" value={userData.gender} disabled></Input>   
                      </Label>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={userData.dob}
                          disabled
                        >
                        </Input>
                      </FormGroup>
                    </Col>
                   
                  </Row> 
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="mobileNumber"> Mobile number </Label>
                        <Input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="number"
                          value={userData.mobileNumber}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                 
                    <div className="text-center">
                              <Button
                               className="ms-5"
                               color="danger"
                               tag={ReactLink}
                               to="/admin/users"
                              >
                              BACK
                              </Button>
                    </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BaseAdmin>
    )
}

export default ViewUser;