import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { insertActivity } from "../../../services/admin/activityServices";
import BaseAdmin from "../../../components/BaseAdmin";
import { getCities } from "../../../services/commonService";

const AddActivity = () => {
  //Default Values
  const [activityData, setActivityData] = useState({
    activityName: "",
    activityAddress: "",
    destinationCity: "",
    activityType: "",
    activityRate: 0,
    activityActiveStatus: false,
  });

  //Resetting the form
  const resetActivityData = () => {
    setActivityData({
      activityName: "",
      activityAddress: "",
      destinationCity: "",
      activityType: "",
      activityRate: 0,
      activityActiveStatus: true,
    });
  };
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {}, [activityData]);
  const navigate = useNavigate();

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //Data binding
  const handleChange = (event, property) => {
    setActivityData({ ...activityData, [property]: event.target.value });
  };

  // const isValidActivityData = (activityData) => {
  //   var invalidCount = 0;
  //   if (activityData.fromCity === activityData.destCity) {
  //     invalidCount++;
  //     toast.error("From city & destination city can't be same");
  //   }
  // if (flightData.departDateTime > flightData.arrivalDateTime) {
  //   invalidCount++;
  //   toast.error(
  //     "Departure date time can't be higher than arriaval date time"
  //   );
  //}
  // if (flightData.totalSeats < flightData.availableSeats) {
  //   invalidCount++;
  //   toast.error("TotalSeats can't be less than available seats.");
  // }
  // if (flightData.maxCabinBagWt > 15) {
  //   invalidCount++;
  //   toast.error("Max Cabin bagage weight can't be more than 15Kg");
  // }
  // if (flightData.maxCheckInBagWt > 50) {
  //   invalidCount++;
  //   toast.error("Max Checkin bagage weight can't be more than 50Kg");
  // }

  //return (invalidCount === 0) ? true : false;
  //};

  //API Calls
  const getDestinations = () => {
    setCities(getCities());

  };
  // Call server API On Add Flight Button Click
  const addActivity = (event) => {
    event.preventDefault();
    console.log(activityData);
    {
      insertActivity(activityData)
        .then((resp) => {
          console.log(resp);
          console.log("Activity Added successfully");
          toast.success("Activity Added successfully");
          resetActivityData();
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
                          placeholder="Enter Rate per person"
                          type="number"
                          onChange={(e) => handleChange(e, "activityRate")}
                          value={activityData.activityRate}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button color="primary" onClick={addActivity}>
                      Add Activity
                    </Button>
                    <Button
                      className="ms-5"
                      color="danger"
                      tag={ReactLink}
                      to="/admin/activities"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="secondary"
                      className="ms-5"
                      type="reset"
                      onClick={() => resetActivityData()}
                    >
                      Reset{" "}
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

export default AddActivity;
