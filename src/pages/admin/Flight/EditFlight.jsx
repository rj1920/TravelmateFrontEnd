import React, { useEffect, useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { getFlightById, updateFlight } from "../../../services/admin/flightServices";
import { toast } from "react-toastify";
import BaseAdmin from "../../../components/BaseAdmin";
import { getCities } from "../../../services/commonService";

const EditFlight = () => {
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState({
    companyName: "",
    flightCode: "",
    fromCity: "'",
    destCity: "",
    flightDuration: 0,
    departDateTime: "",
    arrivalDateTime: "",
    totalSeats: 0,
    availableSeats: 0,
    ratePerSeat: 0,
    maxCabinBagWt: 0,
    maxCheckInBagWt: 0,
  });
  const [cities, setCities] = useState([]);
  const { flightId } = useParams();

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {
    getFlight(flightId);
  }, [])

  //API Calls
  const getDestinations = () => {
    setCities(getCities());
  };
  //Data binding
  const handleChange = (event, property) => {
    if (property === "departDateTime" || property === "arrivalDateTime") {
      setFlightData({
        ...flightData,
        [property]: event.target.value.replace("T", " "),
      });
    } else {
      setFlightData({ ...flightData, [property]: event.target.value });
    }
  };

  const getFlight = (flightId) => {
    console.log(flightData);

    getFlightById(flightId).then(data => {
      console.log(data);
      setFlightData({ ...data })
    }).catch((error) => {
      console.log("error");
      console.log("Error log");
      toast.error("Eror while signup");
    })
  }


  const isValidFlightData = (flightData) => {
    var invalidCount = 0;
    if (flightData.fromCity === flightData.destCity) {
      invalidCount++;
      toast.error("From city & destination city can't be same");
    }
    if (flightData.departDateTime > flightData.arrivalDateTime) {
      invalidCount++;
      toast.error(
        "Departure date time can't be higher than arriaval date time"
      );
    }
    if (flightData.totalSeats < flightData.availableSeats) {
      invalidCount++;
      toast.error("TotalSeats can't be less than available seats.");
    }
    if (flightData.maxCabinBagWt > 15) {
      invalidCount++;
      toast.error("Max Cabin bagage weight can't be more than 15Kg");
    }
    if (flightData.maxCheckInBagWt > 50) {
      invalidCount++;
      toast.error("Max Checkin bagage weight can't be more than 50Kg");
    }

    return (invalidCount === 0) ? true : false;
  };


  // Call server API On Add Flight Button Click
  const updateFlightData = (event) => {
    console.log(flightData);
    if (isValidFlightData(flightData)) {
      updateFlight(flightData)
        .then((resp) => {
          console.log(resp);
          console.log("Flight Updated successfully");
          toast.success("Flight Updated successfully");
          navigate("/admin/flights");
        })
        .catch((error) => {
          console.log("Error log" + error);
          toast.error("Error :: " + error?.response?.data?.message);
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
                <h3>Update Flight</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="companyName">Airline Name</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="Enter Airline Name"
                          type="text"
                          value={flightData.companyName}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
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
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="departDateTime">Departure Date Time</Label>
                        <Input
                          id="departDateTime"
                          name="departDateTime"
                          type="datetime-local"
                          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"
                          value={flightData.departDateTime}
                          max={flightData.arrivalDateTime}
                          onChange={(e) => handleChange(e, "departDateTime")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="arrivalDateTime">Arrival Date Time</Label>
                        <Input
                          id="arrivalDateTime"
                          name="arrivalDateTime"
                          type="datetime-local"
                          min={flightData.departDateTime}
                          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"
                          value={flightData.arrivalDateTime}
                          onChange={(e) => handleChange(e, "arrivalDateTime")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="fromCity">From City</Label>
                        <Input
                          id="fromCity"
                          name="fromCity"
                          type="select"
                          onChange={(e) => handleChange(e, "fromCity")}
                          disabled
                          value={flightData.fromCity}
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
                    <Col md={6}>
                      <FormGroup>
                        <Label for="destCity">Destination City</Label>
                        <Input
                          id="destCity"
                          name="destCity"
                          type="select"
                          onChange={(e) => handleChange(e, "destCity")}
                          disabled
                          value={flightData.destCity}
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
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="totalSeats">Total Seats</Label>
                        <Input
                          id="totalSeats"
                          name="totalSeats"
                          placeholder="Total Seats"
                          type="number"
                          value={flightData.totalSeats}
                          disabled
                          onChange={(e) => handleChange(e, "totalSeats")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="availableSeats">Available Seats</Label>
                        <Input
                          id="availableSeats"
                          name="availableSeats"
                          placeholder="Available Seats"
                          type="number"
                          disabled
                          value={flightData.availableSeats}
                          onChange={(e) => handleChange(e, "availableSeats")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="ratePerSeat">Rate Per Seat</Label>
                        <Input
                          id="ratePerSeat"
                          name="ratePerSeat"
                          placeholder="Enter Rate per seat"
                          type="number"
                          value={flightData.ratePerSeat}
                          disabled
                          onChange={(e) => handleChange(e, "ratePerSeat")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="flightDuration">FlightDuration</Label>
                        <Input
                          id="flightDuration"
                          name="flightDuration"
                          placeholder="Flight Duration"
                          type="number"
                          value={flightData.flightDuration}
                          onChange={(e) => handleChange(e, "flightDuration")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="maxCabinBagWt">
                          Cabin Bag weight (Max 15kg)
                        </Label>
                        <Input
                          id="maxCabinBagWt"
                          name="maxCabinBagWt"
                          placeholder="Max Cabin Bag weight"
                          type="number"
                          min={0}
                          max={15}
                          disabled
                          value={flightData.maxCabinBagWt}
                          onChange={(e) => handleChange(e, "maxCabinBagWt")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="maxCheckInBagWt">
                          Checkin Bag weight(Max 50kg)
                        </Label>
                        <Input
                          id="maxCheckInBagWt"
                          name="maxCheckInBagWt"
                          placeholder="Max Checkin Bag weight"
                          type="number"
                          min={0}
                          max={50}
                          disabled
                          value={flightData.maxCheckInBagWt}
                          onChange={(e) => handleChange(e, "maxCheckInBagWt")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button color="primary" onClick={updateFlightData}>
                      Update Flight
                    </Button>
                    <Button
                      className="ms-5"
                      color="danger"
                      tag={ReactLink}
                      to="/admin/flights"
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
  )
}

export default EditFlight