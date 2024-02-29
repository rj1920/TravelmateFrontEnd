import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseAdmin from '../../../components/BaseAdmin'
import { insertHotel, uploadImages } from "../../../services/admin/hotelService";
import {
    Container,
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
    FormText,
    Table,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getCities } from "../../../services/commonService";
const AddHotel = () => {

    //Modal for room
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    const [roomMode, setRoomMode] = useState("");
    const [editableRoomIndex, setEditableRoomIndex] = useState();
    const [hotelImage, setHotelImage] = useState([]);
    const [roomImage, setRoomImage] = useState([]);
    const [cities, setCities] = useState([]);

    const [hotelData, setHotelData] = useState({
        hotelName: "",
        hotelType: "",
        hotelAddress: "",
        destinationCity: "",
        pin: 0,
        wifiStatus: false,
        parkingStatus: false,
        swimmingPoolStatus: false,
        gymStatus: false,
        hotelActiveStatus: true,
        checkinTime: "",
        checkOutTime: "",
        hotelImage:"",
        rooms: []
    });

    const [roomData, setRoomData] = useState({
        roomType: "",
        roomRate: 0,
        roomCapacity: 0,
        availableRooms: 0,
        breakfastIncludedStatus: false,
        breakfastIncludedStatus: false,
        acNonAcStatus: false,
        roomActiveStatus: true,
        roomImage:""
    });

    const resetRoomData = () => {
        setRoomData({
            roomType: "",
            roomRate: 0,
            roomCapacity: 0,
            availableRooms: 0,
            breakfastIncludedStatus: false,
            acNonAcStatus: false,
            roomActiveStatus: true,
            roomImage:""
        })
    }

    const resetHotelData = () => {
        setHotelData({
            hotelName: "",
            hotelType: "",
            hotelAddress: "",
            destinationCity: "",
            pin: 0,
            wifiStatus: false,
            parkingStatus: false,
            swimmingPoolStatus: false,
            gymStatus: false,
            hotelActiveStatus: true,
            checkinTime: "",
            checkOutTime: "",
            hotelImage:"",
            rooms: []
        })
    }

    useEffect(() => {
        getDestinations();
    }, []);


    useEffect(() => {
    }, [hotelData, roomData]);

    const navigate = useNavigate();

    //Data binding
    const handleHotelChange = (event, property) => {
        if (property === "parkingStatus" || property === "swimmingPoolStatus"
            || property === "gymStatus" || property === "wifiStatus") {
            setHotelData({ ...hotelData, [property]: event?.target?.checked });
        } else {
            setHotelData({ ...hotelData, [property]: event.target.value });
        }
    };
    const handleRoomChange = (event, property) => {
        if (property === "breakfastIncludedStatus" || property === "acNonAcStatus") {
            setRoomData({ ...roomData, [property]: event?.target?.checked });
        } else {
            setRoomData({ ...roomData, [property]: event.target.value });
        }
    };


    const handleHotelImageChange = (e) => {
        console.log(e.target.files)
        setHotelImage(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            document.getElementById("hotelImg").setAttribute('src', URL.createObjectURL(e.target.files[0]));
        } else {
            document.getElementById("hotelImg").setAttribute('src', "");
        }
    }
 
    const handleRoomImageChange = (e) => {
        
        console.log(e.target.files)
        setRoomImage(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            document.getElementById("roomImg").setAttribute('src', URL.createObjectURL(e.target.files[0]));
        } else {
            document.getElementById("roomImg").setAttribute('src', "");
        }
    }
    //API Calls
    const getDestinations = () => {
        setCities(getCities());
    };

    const addHotel = (event) => {
        event.preventDefault();
        console.log(hotelData);
        let formData = new FormData();
        formData.append('image', hotelImage);

        insertHotel(hotelData)
            .then((resp) => {

                console.log("Hotel :: " + resp);

                //Upload Image
                uploadImages(resp.hotelId, formData)
                    .then((resp) => {
                        console.log("Hotel Added successfully");
                        toast.success("Hotel Added successfully");
                        console.log(resp)
                        resetHotelData();
                        resetRoomData();
                        navigate("/admin/hotels");
                    })
                    .catch((error) => {
                        console.log("Error log" + error);
                        toast.error("Eror : " + error?.response?.data);
                    });


            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Eror : " + error?.response?.data);
            });
    }

    const addRoom = () => {
        console.log(roomData);
        hotelData.rooms.push(roomData);
        resetRoomData();
    }
    const deleteRoom = (room, i) => {
        setRoomData(hotelData.rooms.splice(i, 1));
    }

    const setEditRoomData = (room, roomMode, index) => {
        setRoomData(room);
        setRoomMode(roomMode);
        setEditableRoomIndex(index);
        toggle();
    }

    const updateRoom = () => {
        console.log(roomData);
        let index = hotelData.rooms.findIndex(r => { return r.roomRate == roomData.roomRate });
        hotelData.rooms.splice(editableRoomIndex, 1, roomData);
        hotelData.rooms.push(roomData);
        resetRoomData();
        setEditableRoomIndex(undefined);
        setRoomMode("");
    }


    return (
        <>
            <BaseAdmin>
                <Row className="mt-4">
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            <CardHeader>
                                <h3>Add Hotel</h3>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="hotelName">
                                                    Hotel Name :
                                                </Label>
                                                <Input
                                                    id="hotelName"
                                                    name="hotelName"
                                                    placeholder="Enter Hotel Name "
                                                    type="text"
                                                    value={hotelData.hotelName}
                                                    onChange={(e) => handleHotelChange(e, "hotelName")}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="hotelType" >
                                                    Hotel Type:
                                                </Label>
                                                <Input
                                                    id="hotelType"
                                                    name="hotelType"
                                                    type="select"
                                                    value={hotelData.hotelType}
                                                    onChange={(e) => handleHotelChange(e, "hotelType")}
                                                >
                                                    <option value="NA"> Select Type </option>
                                                    <option value="HOTEL"> Hotel </option>
                                                    <option value="RESORT"> Resort </option>
                                                    <option value="HOSTEL"> Hostel </option>
                                                    <option value="HOMESTAY"> Homestay </option>
                                                    <option value="VILLA"> Villa </option>
                                                    <option value="APARTMENT"> Aartment </option>
                                                    <option value="TREE_HOUSE"> Treehouse </option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="destinationCity">City</Label>
                                                <Input
                                                    id="destinationCity"
                                                    name="destinationCity"
                                                    type="select"
                                                    value={hotelData.destinationCity}
                                                    onChange={(e) => handleHotelChange(e, "destinationCity")}
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
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="pin">PIN</Label>
                                                <Input
                                                    id="pin"
                                                    name="pin"
                                                    type="number"
                                                    value={hotelData.pin}
                                                    onChange={(e) => handleHotelChange(e, "pin")}
                                                >
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="hotelAddress">
                                                    Address
                                                </Label>
                                                <Input
                                                    id="hotelAddress"
                                                    name="hotelAddress"
                                                    type="textarea"
                                                    rows="4" cols="50"
                                                    value={hotelData.hotelAddress}
                                                    onChange={(e) => handleHotelChange(e, "hotelAddress")}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <fieldset>
                                                <FormGroup>
                                                    <Label>Amenities</Label>
                                                    <Row>
                                                        <Col md="auto">
                                                            <FormGroup check inline>
                                                                <Input type="checkbox"
                                                                    id="wifiStatus"
                                                                    name="wifiStatus"
                                                                    checked={hotelData.wifiStatus}
                                                                    onChange={(e) => handleHotelChange(e, "wifiStatus")}
                                                                />
                                                                <Label check>
                                                                    WiFi
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="auto">
                                                            <FormGroup check inline>
                                                                <Input type="checkbox"
                                                                    id="gymStatus"
                                                                    name="gymStatus"
                                                                    checked={hotelData.gymStatus}
                                                                    onChange={(e) => handleHotelChange(e, "gymStatus")}
                                                                />
                                                                <Label check>
                                                                    Gym
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="auto">
                                                            <FormGroup check inline>
                                                                <Input type="checkbox"
                                                                    id="swimmingPoolStatus"
                                                                    name="swimmingPoolStatus"
                                                                    checked={hotelData.swimmingPoolStatus}
                                                                    onChange={(e) => handleHotelChange(e, "swimmingPoolStatus")}
                                                                />
                                                                <Label check>
                                                                    Swimming Pool
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="auto">
                                                            <FormGroup check inline>
                                                                <Input type="checkbox"
                                                                    id="parkingStatus"
                                                                    name="parkingStatus"
                                                                    checked={hotelData.parkingStatus}
                                                                    onChange={(e) => handleHotelChange(e, "parkingStatus")}
                                                                />
                                                                <Label check>
                                                                    Parking Area
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </fieldset>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="checkinTime">Check In Time</Label>
                                                <Input
                                                    id="checkinTime"
                                                    name="checkinTime"
                                                    type="time"
                                                    value={hotelData.checkinTime}
                                                    onChange={(e) => handleHotelChange(e, "checkinTime")}
                                                ></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="checkOutTime">Check Out Time</Label>
                                                <Input
                                                    id="checkOutTime"
                                                    name="checkOutTime"
                                                    type="time"
                                                    value={hotelData.checkOutTime}
                                                    onChange={(e) => handleHotelChange(e, "checkOutTime")}
                                                ></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="image">
                                                    Hotel Image
                                                </Label>
                                                <FormText className="ms-3">
                                                    Choose Image
                                                </FormText>
                                                <Input
                                                    id="hotelImage"
                                                    name="hotelImage"
                                                    type="file"
                                                    onChange={handleHotelImageChange}
                                                />
                                                <div className="text-center">
                                                    <img id="hotelImg" src="" width="200" className="mt-3" />
                                                </div>
                                            </FormGroup>

                                        </Col>

                                    </Row>
                                    <hr />
                                    <Row>
                                        <Label>Room Details</Label><br />
                                        <Col md={12} className="text-right">
                                            <Button color="primary" onClick={toggle}>
                                                Add Room
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <fieldset>
                                                <br></br>
                                                <Container >
                                                    <Table bordered hover responsive striped >
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th>
                                                                    Room Type
                                                                </th>
                                                                <th>
                                                                    Room Capacity
                                                                </th>
                                                                <th>
                                                                    Available Rooms
                                                                </th>
                                                                <th>
                                                                    Breakfast
                                                                </th>
                                                                <th>
                                                                    Room Rate Per Head
                                                                </th>
                                                                <th>
                                                                    Action
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {hotelData?.rooms.map((room, i) => {
                                                                return (
                                                                    <tr id={room.roomId} key={i}>
                                                                        <td>{room.roomType}</td>
                                                                        <td>{room.roomCapacity}</td>
                                                                        <td>{room.availableRooms}</td>
                                                                        <td>{room.breakfastIncludedStatus ? "Yes" : "No"}</td>
                                                                        <td>{room.roomRate}</td>
                                                                        <td>
                                                                            <div className="text-center">
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={() => deleteRoom(room, i)}
                                                                                >
                                                                                    Delete
                                                                                </Button>

                                                                                <Button
                                                                                    className="ms-4"
                                                                                    color="info"
                                                                                    onClick={() => setEditRoomData(room, "edit", i)}
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
                                            </fieldset>

                                        </Col>
                                    </Row>
                                    <Row className="text-center mt-3">
                                        <Col>
                                            <div >
                                                <Button color="primary" onClick={addHotel}>
                                                    Add Hotel
                                                </Button>
                                                <Button
                                                    className="ms-5"
                                                    color="danger"
                                                    tag={ReactLink}
                                                    to="/admin/hotels"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    className="ms-5"
                                                    type="reset"
                                                    onClick={() => resetHotelData()}
                                                >
                                                    Reset{" "}
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle} centered={true} scrollable={true} size={"lg"}>
                    {(roomMode !== "edit") && (
                        <>
                            <ModalHeader toggle={toggle}>Add Room</ModalHeader>
                        </>
                    )}
                    {(roomMode === "edit") && (
                        <>
                            <ModalHeader toggle={toggle}>Update Room</ModalHeader>
                        </>
                    )}
                    <ModalBody>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="roomType" >
                                        Room Type:
                                    </Label>
                                    <Input
                                        id="roomType"
                                        name="roomType"
                                        type="select"
                                        value={roomData.roomType}
                                        onChange={(e) => handleRoomChange(e, "roomType")}
                                    >
                                        <option value={"NA"}> Select Type </option>
                                        <option value={"STANDARD"} > Standard </option>
                                        <option value={"DELUX"}> Delux </option>
                                        <option value={"STUDIO"}> Studio </option>
                                        <option value={"CONNECTING"}> Conecting </option>
                                        <option value={"SUITES"}> Suites </option>
                                        <option value={"GARDEN_VILLA"}> Garden Villa </option>
                                        <option value={"POOL_VILLA"}> Pool Villa </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="roomCapacity">
                                        Room Capacity(Max 4)
                                    </Label>
                                    <Input
                                        id="roomCapacity"
                                        name="roomCapacity"
                                        type="number"
                                        min={2}
                                        max={4}
                                        value={roomData.roomCapacity}
                                        onChange={(e) => handleRoomChange(e, "roomCapacity")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="availableRooms">
                                        Available Rooms
                                    </Label>
                                    <Input
                                        id="availableRooms"
                                        name="availableRooms"
                                        placeholder="Available Rooms"
                                        type="number"
                                        value={roomData.availableRooms}
                                        onChange={(e) => handleRoomChange(e, "availableRooms")}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="roomRate">
                                        Room Rate
                                    </Label>
                                    <Input
                                        id="roomRate"
                                        name="roomRate"
                                        placeholder="Room Rate(INR)"
                                        type="number"
                                        value={roomData.roomRate}
                                        onChange={(e) => handleRoomChange(e, "roomRate")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <FormGroup check inline>
                                    <Input type="checkbox"
                                        id="breakfastIncludedStatus"
                                        name="breakfastIncludedStatus"
                                        checked={roomData.breakfastIncludedStatus}
                                        onChange={(e) => handleRoomChange(e, "breakfastIncludedStatus")} />
                                    <Label check>
                                        Is Breakfast included.
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input type="checkbox"
                                        id="acNonAcStatus"
                                        name="acNonAcStatus"
                                        checked={roomData.acNonAcStatus}
                                        onChange={(e) => handleRoomChange(e, "acNonAcStatus")} />
                                    <Label check>
                                        AC
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                            <FormGroup>
                                                <Label for="image1">
                                                    Room Image
                                                </Label>
                                                <FormText className="ms-3">
                                                    Choose Image
                                                </FormText>
                                                <Input
                                                    id="roomImage"
                                                    name="roomImage"
                                                    type="file"
                                                    onChange={handleRoomImageChange}
                                                />
                                                <div className="text-center">
                                                    <img id="roomImg" src="" width="200" className="mt-3" />
                                                </div>
                                            </FormGroup>
                                        </Col>
                        </Row>
                        {/* <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="roomImage">
                                        Room Image
                                    </Label>
                                    <FormText className="ms-3">
                                        Choose Image
                                    </FormText>
                                    <Input
                                        id="roomImage"
                                        name="roomImage"
                                        type="file"
                                        onChange={handleRoomImageChange}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col ms={6}>
                            </Col>
                        </Row> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { addRoom(); toggle(); }} hidden={roomMode === "edit"}>
                            Add Room
                        </Button>{' '}
                        <Button color="primary" onClick={() => { updateRoom(); toggle(); }} hidden={roomMode !== "edit"}>
                            Update Room
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </BaseAdmin>
        </>
    )
}

export default AddHotel