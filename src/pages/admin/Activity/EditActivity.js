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
import {
  updateActivity,
  getActivityById
} from "../../../services/admin/activityServices";
import BaseAdmin from "../../../components/BaseAdmin";
import { getCities } from "../../../services/commonService";

const EditActivity = () => {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({
    activityName: "",
    activityAddress: "",
    destinationCity: "",
    activityType: "",
    activityRate: 0,
    activityActiveStatus: false,
  });
  const [cities, setCities] = useState([]);
  const { activityId } = useParams();

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {
    getActivity(activityId);
  }, []);

  const handleChange = (event, property) => {
    setActivityData({ ...activityData, [property]: event.target.value });
  };

  //API Calls
  const getDestinations = () => {
        setCities(getCities());

  };
  const getActivity = (activityId) => {
    console.log(activityData);

    getActivityById(activityId)
      .then((data) => {
        console.log(data);
        setActivityData({ ...data });
      })
      .catch((error) => {
        console.log("error");
        console.log("Error log");
        toast.error("Eror while signup");
      });
  };

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const updateActivityData = (event) => {
    console.log(activityData);
    {
      updateActivity(activityData)
        .then((resp) => {
          console.log(resp);
          console.log("Activity Added successfully");
          toast.success("Activity Added successfully");
          // resetActivityData();
          navigate("/admin/Activities");
        })
        .catch((error) => {
          console.log("Error log" + error);
          toast.error("Eror while adding data to activity");
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
                <h3>Add Activity</h3>
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
                          placeholder="Enter Activity Name"
                          type="text"
                          value={activityData.activityName}
                          onChange={(e) => handleChange(e, "activityName")}
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
                          onChange={(e) => handleChange(e, "destinationCity")}
                          value={activityData.destinationCity}
                        >
                          <option value="NA">Select City</option>
                          {cities.map((city, i) => {
                            return (
                              <option value={city.cityName} key={i}>
                                {city.cityName}
                              </option>
                            );
                          })}
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
                          // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"
                          value={activityData.activityAddress}
                          // max={flightData.arrivalDateTime}
                          onChange={(e) => handleChange(e, "activityAddress")}
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
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="activityRate"> Activity Rate </Label>
                        <Input
                          id="activityRate"
                          name="activityRate"
                          placeholder="Enter Rate per person"
                          type="number"
                          onChange={(e) => handleChange(e, "activityRate")}
                          value={activityData.activityRate}
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
                        >
                          <option value={null}>Select Activity Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>InActive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button color="primary" onClick={updateActivityData}>
                      Update Activity
                    </Button>
                    <Button
                      className="ms-5"
                      color="danger"
                      tag={ReactLink}
                      to="/admin/activities"
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

export default EditActivity;
