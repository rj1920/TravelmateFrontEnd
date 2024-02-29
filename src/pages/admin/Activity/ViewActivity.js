import React, { useEffect, useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
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
import { getActivityById } from "../../../services/admin/activityServices";
import { toast } from "react-toastify";
import BaseAdmin from "../../../components/BaseAdmin";

const ViewActivity = () => {

    const [activityData, setactivityData] = useState({
        activityName: "",
        activityAddress: "",
        destinationCity: "",
        activityType: "",
        activityRate: 0,
        activityActiveStatus: false ,
    });

    const { activityId } = useParams();

    useEffect(() => {
        getActivity(activityId);
    }, [])

    const getActivity = (activityId) => {
        console.log(activityData);

        getActivityById(activityId).then(data => {
            console.log(data);
            setactivityData({ ...data })
        }).catch((error) => {
            console.log("error");
            console.log("Error log");
            toast.error("Eror while signup");
        })
    }    


    return (
        <>
            <BaseAdmin>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
              <CardHeader>
                <h3>View Activity</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityName">Activity Name</Label>
                        <Input
                          id="activityName"
                          name="activityName"
                          type="text"
                          value={activityData.activityName}
                         disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="destinationCity">Activty City</Label>
                        <Input
                          id="destinationCity"
                          name="destinationCity"
                          type="select"
                          value={activityData.destinationCity}
                          disabled
                        >
                            <option>Select City</option>
                            <option>Kochi</option>
                            <option>Jodhpur </option>
                            <option>Mumbai</option>
                            <option>Leh</option>
                            <option>Goa</option>
                        </Input>
                      </FormGroup>
                    </Col> 
                    {/* <Col md={6}>
                      <FormGroup>
                        <Label for="flightCode">Flight Code</Label>
                        <Input
                          id="flightCode"
                          name="flightCode"
                          placeholder="Enter Flightcode"
                          type="text"
                          value={flightData.flightCode}
                          onChange={(e) => handleChange(e, "flightCode")}
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityAddress">Activity Address</Label>
                        <Input
                          id="activityAddress"
                          name="activityAddress"
                          type="textarea"
                          value={activityData.activityAddress}
                         disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityType">Activity Type</Label>
                        <Input
                          id="activityType"
                          name="activityType"
                          type="select"
                          value={activityData.activityType}
                          disabled
                        >
                          <option>Select Activity Type</option>
                          <option>Camping Adventure</option>
                          <option>Sea Adventure</option>
                          <option>leasure</option>
                          <option>Trekking</option>
                          <option>cultural experiences</option>
                          <option>Jungle Safari</option>
                        </Input>
                      </FormGroup>
                    </Col>
               
                   
                  </Row> 
                  {/* <Row>
                    
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityType">Activity Type</Label>
                        <Input
                          id="activityType"
                          name="activityType"
                          type="select"
                          onChange={(e) => handleChange(e, "activityType")}
                          value={activityData.activityType}
                        >
                          <option>Select Activity Type</option>
                          <option>Camping Adventure</option>
                          <option>Sea Adventure</option>
                          <option>leasure</option>
                          <option>Trekking</option>
                          <option>cultural experiences</option>
                          <option>Jungle Safari</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row> */}
                 
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityRate"> Activity Rate </Label>
                        <Input
                          id="activityRate"
                          name="activityRate"
                          type="number"
                          value={activityData.activityRate}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityActiveStatus">Activity Status</Label>
                        <Input
                          id="activityActiveStatus"
                          name="activityActiveStatus"
                          type="select"
                          onChange={(e) => handleChange(e, "activityActiveStatus")}
                          value={activityData.activityActiveStatus}
                          disabled
                        >
                          <option >Select Activity Type</option>
                          <option >Active</option>
                          <option >InActive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    </Row>
                    <div className="text-center">
                                        <Button
                                            className="ms-5"
                                            color="danger"
                                            tag={ReactLink}
                                            to="/admin/activities"
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
        </>
    )
}

export default ViewActivity