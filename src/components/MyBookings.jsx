import Base from "./base"
import React, { useEffect, useState } from "react";
import { getBookingByUser } from "../services/booking-service";
import { toast } from "react-toastify";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Table } from "reactstrap";
import Footer from "./Footer";
const MyBookings = () => {

    const [myBooking, setMyBookings] = useState([]);
    const [bookingData, setBookingData] = useState(
        {
            "bookingId": 0,
            "fromCity": "",
            "tourStartDate": "",
            "tourEndDate": "",
            "noOfGuests": 0,
            "bookingStatus": "",
            "user": {
                "userId": 0,
                "name": "",
                "dob": "",
                "gender": "",
                "mobileNumber": 0,
                "email": "",
                "role": "",
                "activeStatus": false
            },
            "guests": [
                {
                    "guestId": 0,
                    "booking": {
                        "bookingId": 0,
                        "fromCity": "",
                        "tourStartDate": "",
                        "tourEndDate": "",
                        "noOfGuests": 0,
                        "bookingStatus": 0,
                        "departureFlight": {
                            "flightId": 0,
                            "flightCode": "",
                            "companyName": "",
                            "fromCity": "",
                            "destCity": "",
                            "flightDuration": 0,
                            "departDateTime": "",
                            "arrivalDateTime": "",
                            "totalSeats": 0,
                            "availableSeats": 0,
                            "ratePerSeat": 0.0,
                            "maxCabinBagWt": 0.0,
                            "maxCheckInBagWt": 0.0
                        },
                        "returnFlight": {
                            "flightId": 0,
                            "flightCode": "0",
                            "companyName": "",
                            "fromCity": "",
                            "destCity": "",
                            "flightDuration": 0,
                            "departDateTime": "",
                            "arrivalDateTime": "",
                            "totalSeats": 0,
                            "availableSeats": 0,
                            "ratePerSeat": 0.0,
                            "maxCabinBagWt": 0.0,
                            "maxCheckInBagWt": 0.0
                        },
                        "payment": {
                            "paymentId": 0,
                            "modeOfPayment": "",
                            "debitAccountNumber": "",
                            "creditAccountNumber": "",
                            "totalAmount": 0.0,
                            "paymentStatus": "",
                            "paymentDate": ""
                        }
                    },
                    "guestFirstName": "",
                    "guestLastName": "",
                    "dob": "",
                    "gender": ""
                }
            ],
            "bookedPackageDetails": {
                "bookedPkgId": 0,
                "pkgName": "",
                "pkgType": "",
                "destinationCity": "",
                "noOfNights": 0,
                "flightStatus": false,
                "dropStatus": false,
                "packageBaseRate": 0.0,
                "bookingRoomRate": 0.0
            },
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
                "checkinTime": "",
                "checkOutTime": "",
                "hotelActiveStatus": false,
                "imgPath": null
            },
            "room": {
                "roomId": 0,
                "roomType": "",
                "roomRate": 0.0,
                "roomCapacity": 0,
                "availableRooms": 0,
                "breakfastIncludedStatus": false,
                "acNonAcStatus": false,
                "roomActiveStatus": false,
                "imgPath": null
            },
            "departureFlight": {
                "flightId": 0,
                "flightCode": "",
                "companyName": "",
                "fromCity": "",
                "destCity": "",
                "flightDuration": 0,
                "departDateTime": "",
                "arrivalDateTime": "",
                "totalSeats": 0,
                "availableSeats": 0,
                "ratePerSeat": 0.0,
                "maxCabinBagWt": 0.0,
                "maxCheckInBagWt": 0.0
            },
            "returnFlight": {
                "flightId": 0,
                "flightCode": "",
                "companyName": "",
                "fromCity": "",
                "destCity": "",
                "flightDuration": 0,
                "departDateTime": "",
                "arrivalDateTime": "",
                "totalSeats": 0,
                "availableSeats": 0,
                "ratePerSeat": 0.0,
                "maxCabinBagWt": 0.0,
                "maxCheckInBagWt": 0.0
            },
            "payment": {
                "paymentId": 0,
                "modeOfPayment": "",
                "debitAccountNumber": "",
                "creditAccountNumber": "",
                "totalAmount": 0.0,
                "paymentStatus": "",
                "paymentDate": ""
            },
            "bookedActivities": [
                {
                    "bookedActivityId": 0,
                    "activity": {
                        "activityId": 0,
                        "activityName": "",
                        "activityAddress": "",
                        "destinationCity": "",
                        "activityType": "",
                        "activityRate": 0.0,
                        "activityActiveStatus": false
                    },
                    "dayOfActivity": 0,
                    "bookingRateOfActivity": 0.0
                },
                {
                    "bookedActivityId": 0,
                    "activity": {
                        "activityId": 0,
                        "activityName": "",
                        "activityAddress": "",
                        "destinationCity": "",
                        "activityType": "",
                        "activityRate": 0.0,
                        "activityActiveStatus": false
                    },
                    "dayOfActivity": 0,
                    "bookingRateOfActivity": 0.0
                }
            ]
        }
    );
    useEffect(() => {
        getBooking(localStorage.getItem("userId"));
    }, []);


    useEffect(() => {
    }, [myBooking]);

    const getBooking = (userId) => {
        getBookingByUser(userId).then(data => {
            console.log(data);
            setMyBookings(data);
        }).catch((error) => {
            console.log("error");
            console.log("Error log");
            toast.error("Eror while signup");
        })
    }
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    return (
        <Base>
            <h1 style={{ textAlign: 'center' }}>MY BOOKINGS</h1>
            <br></br>
            <Accordion toggle={toggle} open={open}>
                <AccordionItem>
                    <AccordionHeader targetId="1"><b>UPCOMING</b></AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Table bordered hover responsive striped>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Package Details</th>
                                    <th>Start Date</th>
                                    <th>No Of Guests</th>
                                    <th>Mode Of Payment</th>

                                </tr>
                            </thead>
                            <tbody>
                                {myBooking?.map((booking, i) => {
                                    return (
                                        <tr id={booking.bookingId} key={i} style={{ textAlign: 'center' }}>
                                            <td>{booking.bookedPackageDetails.pkgName}</td>
                                            <td>{booking.tourStartDate}</td>
                                            <td>{booking.noOfGuests}</td>
                                            <td>{booking.payment.modeOfPayment}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </AccordionBody>
                </AccordionItem>

                <AccordionItem>
                    <AccordionHeader targetId="2"><b>COMPLETED</b></AccordionHeader>
                    <AccordionBody accordionId="2">
                        <Table bordered hover responsive striped>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Package Details</th>
                                    <th>Start Date</th>
                                    <th>No Of Guests</th>
                                    <th>Mode Of Payment</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr style={{ textAlign: 'center' }}>
                                    <td>{bookingData.bookedPackageDetails.pkgName}</td>
                                    <td>{bookingData.tourStartDate}</td>
                                    <td>{bookingData.noOfGuests}</td>
                                    <td>{bookingData.payment.modeOfPayment}</td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="3"><b>CANCELLED</b></AccordionHeader>
                    <AccordionBody accordionId="3">
                        <Table bordered hover responsive striped>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Package Details</th>
                                    <th>Start Date</th>
                                    <th>No Of Guests</th>
                                    <th>Mode Of Payment</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr style={{ textAlign: 'center' }}>
                                    <td>{bookingData.bookedPackageDetails.pkgName}</td>
                                    <td>{bookingData.tourStartDate}</td>
                                    <td>{bookingData.noOfGuests}</td>
                                    <td>{bookingData.payment.modeOfPayment}</td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </AccordionBody>
                </AccordionItem></Accordion>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br><br></br>
                <br></br>
                <br></br>
                <Footer ></Footer>
        </Base>
    );
}
export default MyBookings;