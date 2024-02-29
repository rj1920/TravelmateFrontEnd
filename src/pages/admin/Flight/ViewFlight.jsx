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
import { getFlightById } from "../../../services/admin/flightServices";
import { toast } from "react-toastify";
import BaseAdmin from "../../../components/BaseAdmin";
import { getCities } from "../../../services/commonService";

const ViewFlight = () => {

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


    return (
        <>
            <BaseAdmin>
                <Row className="mt-4">
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            <CardHeader>
                                <h3>View Flight</h3>
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
                                                    type="text"
                                                    value={flightData.flightCode}
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    value={flightData.fromCity}
                                                    disabled
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
                                                    value={flightData.destCity}
                                                    disabled
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
                                                    value={flightData.availableSeats}
                                                    disabled
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
                                                    disabled
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
                                                    value={flightData.maxCabinBagWt}
                                                    disabled
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
                                                    value={flightData.maxCheckInBagWt}
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
                                            to="/admin/flights"
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

export default ViewFlight