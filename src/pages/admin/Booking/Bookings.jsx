import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Label,
    Row,
    Table
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseAdmin from "../../../components/BaseAdmin";
import { doLogout } from "../../../auth";
import { getAllBookings, updateBookingStatus } from "../../../services/booking-service";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Bookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState({});
    const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    useEffect(() => {
        getBooking();
    }, []);

    const getBooking = (event) => {
        getAllBookings()
            .then((resp) => {
                console.log(resp);
                const updatedBookings = resp.map(booking => ({ ...booking, isCancelButtonDisabled: false }));
                setBookings(updatedBookings);
            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Error :: " + error?.response?.data?.message);
                if (error?.response?.data?.message.includes("JWT expired")) {
                    doLogout(() => {
                        navigate("/login")
                    })
                }
            });
    };

    const getBookingStatus = (statusCode) => {
        if (statusCode == 0) {
            return "Upcoming";
        } else if (statusCode == 1) {
            return "Completed";
        } else {
            return "Cancelled";
        }
    }

    const viewBooking = (booking) => {
        setBooking(booking);
        toggle();
    }

    const cancelBooking = (bookingToCancel) => {
        console.log("id", bookingToCancel.bookingId);
        updateBookingStatus(bookingToCancel.bookingId)
            .then((resp) => {
                console.log(resp);
                getBooking();
                navigate("/admin/bookings");
                toast.success("Booking cancelled successfully..!!");
    
                // Update the isCancelButtonDisabled property for the canceled booking
                setBookings(prevBookings =>
                    prevBookings.map(booking =>
                        booking.bookingId === bookingToCancel.bookingId
                            ? { ...booking, isCancelButtonDisabled: true }
                            : booking
                    )
                );
            })
            .catch((error) => {
                // Handle error
            });
    };
    

    return (
        <>
            <BaseAdmin>
                <Container>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h3>Bookings</h3>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}> 
                        <thead>
                            <tr className="text-center">
                                <th>Booking ID</th>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Package Name</th>
                                <th>Payment Status</th>
                                <th>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking, i) => {
                                return (
                                    <tr id={booking.bookingId} key={i}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.user.userId}</td>
                                        <td>{booking.user.name}</td>
                                        <td>{booking.bookedPackageDetails.pkgName}</td>
                                        <td>{booking?.payment?.paymentStatus}</td>
                                        <td>{getBookingStatus(booking.bookingStatus)}</td>
                                        <td>
                                            <div className="text-center">
                                                <Button
                                                    color="primary"
                                                    onClick={() => viewBooking(booking)}
                                                    style={{ marginRight: '20px' }}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    onClick={() => cancelBooking(booking)} // Pass the booking to cancelBooking
                                                    disabled={booking.isCancelButtonDisabled || booking.status === -1}
                                                    color="danger"
                                                >
                                                    Cancel Booking
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={modal} toggle={toggle} centered={true} scrollable={true} size={"lg"} >
                    <ModalHeader toggle={toggle}>View Booking</ModalHeader>
                    <ModalBody style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                        <Row>
                            <Row >
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label>Customer Name :</Label> <p>{booking?.user?.name}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 2 }}>
                                    <FormGroup inline>
                                        <Label>Package Name :</Label> <p>{booking?.bookedPackageDetails?.pkgName}</p>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <FormGroup >
                                        <Label> Number of Guests/Members :</Label> <p>{booking?.noOfGuests}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label> Selected Hotel:</Label> <p>{booking?.hotel?.hotelName}</p>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={{ size: 5, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label> Flight Details :</Label> <p>{booking?.departureFlight?.flightCode} : {booking?.fromCity}-{booking?.bookedPackageDetails?.destinationCity}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 0 }}>
                                    <FormGroup inline>
                                        <Label>Return Flight Details :</Label> <p>{booking?.returnFlight?.flightCode} : {booking?.bookedPackageDetails?.destinationCity}-{booking?.fromCity}</p>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label> Tour Start Date:</Label> <p>{booking?.tourStartDate}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 2 }}>
                                    <FormGroup inline>
                                        <Label> Return Date:</Label> <p>{booking?.tourEndDate}</p>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label> Room Rate:</Label> <p>₹{booking?.bookedPackageDetails?.bookingRoomRate}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 2 }}>
                                    <FormGroup inline>
                                        <Label> Package Base Rate:</Label>
                                        <p>₹{booking?.bookedPackageDetails?.packageBaseRate}</p>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup inline>
                                        <Label>Booking Status :</Label> <p>{getBookingStatus(booking.bookingStatus)}</p>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 2 }}>
                                    <FormGroup inline>
                                        <Label>Payment Status :</Label> <p>{booking?.payment?.paymentStatus}</p>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </BaseAdmin>
        </>
    );
};

export default Bookings;
