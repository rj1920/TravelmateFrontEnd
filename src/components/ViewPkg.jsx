import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getAllFlights, getByFromDestcity } from "../services/admin/flightServices";
import { toast } from "react-toastify";

import {
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Container,
  Table,
  Col,
  FormGroup,
  Label,
  Row
} from "reactstrap";
import Base from "../components/base";
import { getPackageById } from "../services/admin/packageService";
import styled from "styled-components";
import TableRows from "./TableRows";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { doBooking } from "../services/booking-service";
import { getCurrentUserDetail } from "../auth";



const ViewPkg = () => {
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal)

  const navigate = useNavigate();
  const [pkgData, setpkgData] = useState({
    "packageId": 0,
    "pkgName": "",
    "pkgType": "",
    "destinationCity": "",
    "noOfNights": 0,
    "packageBaseRate": 0.0,
    "flightStatus": false,
    "dropStatus": false,
    "packageActiveStatus": false,
    "hotel": {
      "hotelId": 0,
      "hotelName": "",
      "hotelType": "",
      "hotelAddress": "",
      "destinationCity": "",
      "pin": 0,
      "wifiStatus": false,
      "parkingStatus": false,
      "swimmingPoolStatus": false,
      "gymStatus": false,
      "checkinTime": "12:00:00",
      "checkOutTime": "10:00:00",
      "hotelActiveStatus": false,
      "imgPath": ""
    },
    "room": {
      "roomId": 1,
      "roomType": "",
      "roomRate": 0.0,
      "roomCapacity": 0,
      "availableRooms": 0,
      "breakfastIncludedStatus": false,
      "acNonAcStatus": false,
      "roomActiveStatus": false,
      "imgPath": ""
    },
    "pkgActivity": [

    ],
    "guests": []
  });
  const [flightData, setFlightData] = useState([]);
  let [flightData1, setFlightData1] = useState({
    flightId: 0,
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


  const [guests, setGuests] = useState([]);
  const [departureFlight, setDepartureFlight] = useState({});
  const { packageId } = useParams();
  const [open, setOpen] = useState();
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  useEffect(() => {
    getPackage(packageId);
    getFlights();
    setGuests([]);
  }, [])


  // useEffect(() => {
  //   getFlights();
  // }, []);
  const getPackage = (packageId) => {

    console.log(pkgData);
    getPackageById(packageId).then(data => {
      console.log(data);
      setpkgData({ ...data });
      setpkgData(data);

    }).catch((error) => {
      console.log("error");
      console.log("Error log");
      toast.error("Eror while signup");
    })
  }
  const bookpkg = (packageId) => {
    console.log(packageId + "book online");
    console.log(pkgData);
    // pkgData()
    setpkgData({ ...pkgData, ["departureFlight"]: flightData1 });

    let bookedPackageDetails = {
      "pkgName": pkgData.pkgName,
      "pkgType": pkgData.pkgType,
      "destinationCity": pkgData.destinationCity,
      "noOfNights": pkgData.noOfNights,
      "flightStatus": pkgData.flightStatus,
      "dropStatus": pkgData.flightStatus,
      "packageBaseRate": pkgData.packageBaseRate,
      "bookingRoomRate": pkgData.room.roomRate
    }

    let bookedActivities = [];
    pkgData.pkgActivity.map((act) => {
      let bookedAct = {
        "activity": act.activities,
        "dayOfActivity": act.dayOfActivity,
        "bookingRateOfActivity": act.activityRate,
        "bookings": null
      };
      bookedActivities.push(bookedAct)
    })
    if (pkgData.flightStatus) {
      pkgData.departureFlight = flightData1;
      pkgData.returnFlight = flightData1;
    } else {
      pkgData.departureFlight = null;
      pkgData.returnFlight = null;
    }

    // Create JSON Object  to send to API
    let bookingData = {
      "fromCity": localStorage.getItem("fromCity"),
      "tourStartDate": localStorage.getItem("checkin"),
      "tourEndDate": localStorage.getItem("checkout"),
      "noOfGuests": pkgData.guests.length,
      "guests": pkgData.guests,
      "user": getCurrentUserDetail(),
      "bookedPackageDetails": bookedPackageDetails,
      "hotel": pkgData.hotel,
      "room": pkgData.room,
      "departureFlight": pkgData.departureFlight,
      "returnFlight": pkgData.returnFlight,
      "bookedActivities": bookedActivities,
      "bookingStatus": 0,
      "payment": null
    }
    pkgData.bookedPackageDetails = bookedPackageDetails;
    console.log(pkgData);
   

    doBooking(bookingData)
      .then((resp) => {
        console.log("BookingData :: " + resp);
        localStorage.setItem("bookingId",resp.bookingId);
        var totAmt = localStorage.getItem('totalAmount');
        localStorage.setItem('totalAmount1', totAmt * pkgData.guests.length);
        navigate("/allpackages/payment");
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror : " + error?.response?.data);
      });



  };


  const getFlights = (event) => {
    getByFromDestcity(localStorage.getItem("fromCity"), localStorage.getItem("destinationCity"))
      .then((resp) => {
        console.log(resp);
        setDepartureFlight(resp);
        setFlightData(resp);
        // setpkgData({ ...pkgData, ["departureFlight"]: setDepartureFlight })
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while getting flight data");
      });
  };
  const minFlight = flightData.reduce(
    (pflight, cflight) =>
      (pflight?.ratePerSeat ?? cflight?.ratePerSeat) >= cflight?.ratePerSeat
        ? cflight
        : pflight,
    null
  );

  flightData1 = Object.assign({}, minFlight);
  console.log("**" + minFlight);
  console.log("**" + flightData1);
  let valflight = pkgData.flightStatus ? flightData1.ratePerSeat : 0;
  const vall = pkgData.packageBaseRate + valflight;
  localStorage.setItem("totalAmount", vall);
  localStorage.setItem("flightId", flightData1.flightId);
  localStorage.setItem("hotelId", pkgData.hotel.hotelId);
  localStorage.setItem("roomId", pkgData.room.roomId);

  const [rows, initRow] = useState([]);

  const [guestData, setGuestData] = useState({
    guestFirstName: "",
    guestLastName: "",
    dob: "",
    gender: ""
  });

  const resetGuest = () => {
    setGuestData({
      guestFirstName: "",
      guestLastName: "",
      dob: "",
      gender: ""
    })
  }

  useEffect(() => {
  }, [guestData, pkgData]);

  const addRowTable = () => {
    const data = {
      guestFirstName: "",
      guestLastName: "",
      dob: "",
      gender: ""
    };
    initRow([...rows, data]);
  };

  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const handleGuestChange = (event, property) => {
    setGuestData({ ...guestData, [property]: event.target.value });

  };

  const addGuest = (guestData) => {
    if (guests.length === pkgData.room.roomCapacity) {
      toast.error("Can't add guest further. Room capacity full.");
    } else {
      guests.push(guestData);
      // pkgData.guests.push(guestData);
      setpkgData({ ...pkgData, ["guests"]: guests })
      resetGuest();
    }
  }

  const deleteGuest = (guest, i) => {
    setpkgData({ ...pkgData, ["guests"]: pkgData.guests.splice(i, 1) });
  }

  return (
    <Base>
      <div style={{ marginLeft: 60 }}>
        <div>
          <br></br>
          <b><p style={{ fontFamily: 'Vesper Libre', fontSize: 70, position: 'absolute' }}>{pkgData.destinationCity}</p></b>
          <p style={{ marginLeft: 930 }}>
            <b><span style={{ fontSize: 30 }}>INR {isNaN(vall) ? 0 : vall}/-</span></b>
            <i><span>Per Person</span></i>
            <b><i><p style={{ fontSize: 13, marginLeft: 140 }} hidden={!pkgData.flightStatus ? true : ''}>*Inclusive Flight Rate</p></i></b>
            <br></br><br></br>
            <Button color="primary" onClick={() => bookpkg(pkgData.packageId)}>Proceed to Book Online</Button>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box', alignItems: 'center' }}>
            <div style={{ color: '#6d7278', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <span style={{ width: '50', padding: '3px 5px 5px 5px', borderRadius: 15, backgroundColor: '#26b5a9', fontSize: 16, color: '#fff', marginRight: 3 }}>{pkgData.noOfNights}N/{pkgData.noOfNights + 1}D</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input type="checkbox" id="isFlight" checked={pkgData.flightStatus} />&nbsp;<span style={{ fontSize: 18, alignItems: 'center', color: '' }}>Flight Available</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input type="checkbox" id="isdrop" checked={pkgData.dropStatus} />&nbsp;<span style={{ fontSize: 18, alignItems: 'center', color: '' }}>Transfers Available</span>
            </div>
          </div>
          <br></br>
          <div className="col-sm-2">
            {/* <img></img> */}
          </div>
          <br></br>
          <Accordion toggle={toggle} open={open}>
            <AccordionItem hidden={!pkgData.flightStatus ? true : ''}>
              <AccordionHeader targetId="1"><b>Flight Details</b></AccordionHeader>
              <AccordionBody accordionId="1" >
                <br></br>
                <Table bordered hover responsive striped>
                  <thead>
                    <tr style={{ textAlign: 'center' }}>
                      <th>Company</th>
                      <th>Flight Code</th>
                      <th>Duration</th>
                      <th>Rate</th>
                      <th>Max Cabin Bag Weight</th>
                      <th>Max CheckIn Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ textAlign: 'center' }}>
                      <td>{flightData1.companyName}</td>
                      <td>{flightData1.flightCode}</td>
                      <td>{flightData1.flightDuration} min</td>
                      <td>INR {flightData1.ratePerSeat}*/-</td>
                      <td>{flightData1.maxCabinBagWt}</td>
                      <td>{flightData1.maxCheckInBagWt}</td>
                    </tr></tbody>
                </Table>
                <h6 style={{ fontSize: 10 }}>*Price is included in BaseRate of Package</h6>
                <br></br>
              </AccordionBody>
            </AccordionItem>
            <br></br>

            <AccordionItem>
              <AccordionHeader targetId="2"><b>Hotel Details</b></AccordionHeader>
              <AccordionBody accordionId="2">
                <div style={{ color: '#6d7278', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center' }}>
                  <Input type="checkbox" id="isparking" checked={pkgData.hotel.parkingStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>Parking Availablity</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" id="iswifi" checked={pkgData.room.wifiStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>Wifi Availablity</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" id="isgym" checked={pkgData.hotel.gymStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>Gym Availablity</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" id="isswimmingpool" checked={pkgData.hotel.swimmingPoolStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>Swimming Pool Availablity</span>
                </div><br></br>
                <div>
                  <img src=""></img>
                </div>
                <div >
                  <h3 >{pkgData.hotel.hotelName}</h3>
                  <i><h6>{pkgData.hotel.hotelType}</h6></i>
                  <p>{pkgData.hotel.hotelAddress} </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 18 }}>CheckIn &nbsp;&nbsp;&nbsp;: {pkgData.hotel.checkinTime}</h4>
                  <h4 style={{ fontSize: 18 }}>CheckOut : {pkgData.hotel.checkOutTime}</h4>
                </div><br></br>
                
                <AccordionItem>
                  <AccordionHeader targetId="2"><b>Room Details</b></AccordionHeader>
                  <AccordionBody accordionId="2">
                    <div style={{ color: '#6d7278', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" id="isbrkfast" checked={pkgData.room.breakfastIncludedStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>Breakfast Availablity</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" id="isAc" checked={pkgData.room.acNonAcStatus} />&nbsp;&nbsp;<span style={{ fontSize: 16, alignItems: 'center', color: '' }}>AC Availablity</span>
                    </div>
                    <div className="App">
                      <br></br>
                      <Table bordered hover responsive striped>
                        <thead>
                          <tr style={{ textAlign: 'center' }}>
                            <th>Room Type</th>
                            <th>Room Rate</th>
                            <th>Room Capacity</th>
                            {/* <td>Available Rooms</td> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{pkgData.room.roomType}</td>
                            <td>{pkgData.room.roomRate}</td>
                            <td>{pkgData.room.roomCapacity}</td>
                            {/* <td>{pkgData.room.availableRooms}</td> */}
                          </tr></tbody>
                      </Table>
                    </div>
                  </AccordionBody>
                </AccordionItem><br></br>

              </AccordionBody>
            </AccordionItem><br></br>
            <AccordionItem>
              <AccordionHeader targetId="3"><b>Activities Included</b></AccordionHeader>
              <AccordionBody accordionId="3">
                <div>
                  <Container>
                    <br></br>
                    <Table bordered hover responsive striped>
                      <thead>
                        <tr style={{ textAlign: 'center' }}>
                          <th>Day of Activity</th>
                          <th>Activity Name</th>
                          <th>Activity Type</th>
                          <th>Activity Address</th>
                          <th>Destination City</th>
                          <th>Rate of Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pkgData.pkgActivity.map((item) => {
                          return (
                            <tr style={{ textAlign: 'center' }}>
                              <td>{item.dayOfActivity}</td>
                              <td>{item.activities.activityName}</td>
                              <td>{item.activities.activityType}</td>
                              <td>{item.activities.activityAddress}</td>
                              <td>{item.activities.destinationCity}</td>
                              <td>{item.activities.activityRate}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <br></br>
                    <b><i><p style={{ fontSize: 13 }}>*Inclusive Activity Rate</p></i></b><br></br>
                  </Container>
                </div>
              </AccordionBody>
            </AccordionItem>
            <br></br>
            <AccordionItem>
              <AccordionHeader targetId="4"><b>Guest Details</b></AccordionHeader>
              <AccordionBody accordionId="4">

                {/* <table className="table table-striped">
        <thead style={{textAlign:'center'}}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>
              <button className="btn btn-success" onClick={addRowTable}>
                Insert Row
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rows={rows}
            tableRowRemove={tableRowRemove}
            onValUpdate={onValUpdate}
          />
        </tbody>
      </table> */}

                <Container >
                  <Row>
                    <Label>Guest Details</Label><br />
                    <Col md={12} className="text-right">
                      <Button color="primary" onClick={modalToggle} className="mb-2">
                        Add Guest
                      </Button>
                    </Col>
                  </Row>
                  <Table bordered hover responsive striped >
                    <thead>
                      <tr className="text-center">
                        <th>
                          Guest Name
                        </th>
                        <th>
                          Guest DOB
                        </th>
                        <th>
                          Gender
                        </th>
                        <th>
                          Action
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {pkgData.guests?.map((guest, i) => {
                        return (
                          <tr id={guest?.roomId} key={i}>
                            <td>{guest.guestFirstName}{guest.guestLastName}</td>
                            <td>{guest.dob}</td>
                            <td>{guest.gender}</td>
                            <td>
                              <div className="text-center">
                                <Button
                                  color="primary"
                                  onClick={(e) => { deleteGuest(guest, i); }}
                                >
                                  Delete
                                </Button>

                                <Button
                                  className="ms-4"
                                  color="info"
                                  onClick={() => { }}
                                >
                                  Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Container>

              </AccordionBody>
            </AccordionItem>
          </Accordion>

        </div>
        <br></br>
      </div>
      <Modal isOpen={modal} toggle={modalToggle} centered={true} scrollable={true} size={"lg"}>
        <ModalHeader toggle={modalToggle}>Add Guest</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="guestFirstName">
                  First Name
                </Label>
                <Input
                  id="guestFirstName"
                  name="guestFirstName"
                  placeholder="Guest First Name"
                  type="text"
                  value={guestData.guestFirstName}
                  onChange={(e) => handleGuestChange(e, "guestFirstName")}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="guestLastName">
                  Last Name
                </Label>
                <Input
                  id="guestLastName"
                  name="guestLastName"
                  placeholder="Guest Last Name"
                  type="text"
                  value={guestData.guestLastName}
                  onChange={(e) => handleGuestChange(e, "guestLastName")}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="dob">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={guestData.dob}
                  onChange={(e) => handleGuestChange(e, "dob")}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mt-4">
              <FormGroup gender>
                <Row>
                  <Col md="auto">
                    <Input
                      name="gender"
                      id="gender"
                      type="radio"
                      value="Male"
                      onChange={(e) => handleGuestChange(e, "gender")}
                    />{" "}
                    <Label gender>Male</Label>
                  </Col>

                  <Col md="auto">
                    <Input
                      name="gender"
                      id="gender"
                      type="radio"
                      value="Female"
                      onChange={(e) => handleGuestChange(e, "gender")}
                    />{" "}
                    <Label gender>Female </Label>
                  </Col>

                  <Col md="auto">
                    <Input
                      name="gender"
                      id="gender"
                      type="radio"
                      value="Other"
                      onChange={(e) => handleGuestChange(e, "gender")}
                    />{" "}
                    <Label gender>Other </Label>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { addGuest(guestData); modalToggle(); }}>
            Add Guest
          </Button>{' '}
          <Button color="secondary" onClick={modalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Base>
  );
}
export default ViewPkg;