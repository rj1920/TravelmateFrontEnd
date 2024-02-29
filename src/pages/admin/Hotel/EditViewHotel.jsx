import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseAdmin from '../../../components/BaseAdmin'
import { getHotelById, updateHotels, uploadImages } from "../../../services/admin/hotelService";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../services/helper";
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
const EditViewHotel = () => {

    //Modal for room
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    const navigate = useNavigate();
    const location = useLocation();
    // const [hotelMode, setHotelMode] = useState(location.state.mode);
    const hotelMode = location.state.mode;
    const [roomMode, setRoomMode] = useState("");
    const [hotelImage, setHotelImage] = useState([])
    const [cities, setCities] = useState([]);
    const [roomImage, setRoomImage] = useState([]);

    // Hotel ID fromo request URL
    const { hotelId } = useParams();

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
        getHotel(hotelId);
    }, [])


    const getHotel = (hotelId) => {
        console.log(hotelId);
        getHotelById(hotelId).then(data => {
            console.log(data);
            setHotelData(data);
            let imgPath = BASE_URL + "/hotel/serve/" + data.hotelId + "/" + data.imgPath.substring(data.imgPath.lastIndexOf('/') + 1);
            document.getElementById("hotelImg").setAttribute('src', imgPath);
        }).catch((error) => {
            console.log("Error :" + error);
            console.log("Error log :: " + error);
            toast.error("Erroer while fetching hotel data");
            navigate("/admin/hotels");
        })
    }

    //API Calls
    const getDestinations = () => {
        setCities(getCities());
    };

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

    const updateHotel = (event) => {
        event.preventDefault();
        console.log(hotelData);
        
        let formData = new FormData();
        formData.append('image', hotelImage);
        updateHotels(hotelData)
            .then((resp) => {
                console.log("Hotel :: " + resp);

                //Upload Image
                if(formData.image !== undefined){
                uploadImages(resp.hotelId, formData)
                    .then((resp) => {
                        console.log("Hotel Updated successfully");
                        toast.success("Hotel Updated successfully");
                        console.log(resp)
                        resetHotelData();
                        resetRoomData();
                        navigate("/admin/hotels");
                    })
                    .catch((error) => {
                        console.log("Error log" + error);
                        toast.error("Eror : " + error?.response?.data);
                    });
                }else{
                    resetHotelData();
                    resetRoomData();
                    navigate("/admin/hotels");
                }

            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Eror : " + error?.response?.data);
            });
    }

    // const updateRoom = () => {
    //     console.log(roomData);
    //     let index = hotelData.rooms.findIndex(r => { return r.roomId == roomData.roomId });
    //     hotelData.rooms.splice(index, 1, roomData);
    //     hotelData.rooms.push(roomData);
    //     resetRoomData();
    // }
    const updateRoom = (event) => {
        event.preventDefault();
        console.log(roomData);
        
        let formData = new FormData();
        formData.append('image', roomImage);
        updateRoom(roomData)
            .then((resp) => {
                console.log("Room :: " + resp);

                //Upload Image
                if(formData.image !== undefined){
                uploadImages(resp.roomId, formData)
                    .then((resp) => {
                        console.log("Room Updated successfully");
                        toast.success("Room Updated successfully");
                        console.log(resp)
                        resetHotelData();
                        resetRoomData();
                        navigate("/admin/hotels");
                    })
                    .catch((error) => {
                        console.log("Error log" + error);
                        toast.error("Error : " + error?.response?.data);
                    });
                }else{
                    resetHotelData();
                    resetRoomData();
                    navigate("/admin/hotels");
                }

            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Eror : " + error?.response?.data);
            });
    }
    
    const viewRoom = (room, roomMode) => {
        setRoomData(room);
        setRoomMode(roomMode);
        toggle();
    }

    const editRoom = (room, roomMode) => {
        setRoomData(room);
        setRoomMode(roomMode);
        toggle();
    }


    return (
        <>
            <BaseAdmin>
                <Row className="mt-4">
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            {(hotelMode === "view") && (
                                <>
                                    <CardHeader>
                                        <h3>View Hotel</h3>
                                    </CardHeader>
                                </>
                            )}
                            {(hotelMode === "edit") && (
                                <>
                                    <CardHeader>
                                        <h3>Update Hotel</h3>
                                    </CardHeader>
                                </>
                            )}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                                    disabled={(hotelMode === "view")}
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
                                                                    disabled={(hotelMode === "view")}
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
                                                                    disabled={(hotelMode === "view")}
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
                                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    disabled={(hotelMode === "view")}
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
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    onChange={handleHotelImageChange}
                                                    disabled={(hotelMode === "view")}
                                                />
                                                <div className="text-center">
                                                    <img id="hotelImg" src="" width="200" className="mt-3" />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <hr />
                                    <Label className="ms-3">Room Details</Label><br />
                                    <Row>
                                        <Col md={12}>
                                            <br></br>
                                            <Container >
                                                <Table bordered hover responsive striped >
                                                    <thead className="text-center">
                                                        <tr>
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
                                                                    <td className="text-center">{room.breakfastIncludedStatus ? "Yes" : "No"}</td>
                                                                    <td>{room.roomRate}</td>
                                                                    <td>
                                                                        <div className="text-center">
                                                                            <Button
                                                                                color="primary"
                                                                                onClick={() => viewRoom(room, "view")}
                                                                            >
                                                                                View
                                                                            </Button>

                                                                            {(hotelMode === "edit") && (
                                                                                <>
                                                                                    <Button
                                                                                        className="ms-4"
                                                                                        color="info"
                                                                                        onClick={() => editRoom(room, "edit")}
                                                                                    >
                                                                                        Edit
                                                                                    </Button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row className="text-center mt-3">
                                        <Col>
                                            <div style={{ display: hotelMode === "edit" ? 'block' : 'none' }} >
                                                <Button color="primary" onClick={updateHotel}>
                                                    Update Hotel
                                                </Button>
                                                <Button
                                                    className="ms-5"
                                                    color="danger"
                                                    tag={ReactLink}
                                                    to="/admin/hotels"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                            <div style={{ display: hotelMode === "view" ? 'block' : 'none' }}>
                                                <Button
                                                    className="ms-5"
                                                    color="danger"
                                                    tag={ReactLink}
                                                    to="/admin/hotels"
                                                >
                                                    Back
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
                    {(roomMode === "view") && (
                        <>
                            <ModalHeader toggle={toggle}>View Room</ModalHeader>
                        </>
                    )}
                    {(roomMode === "edit") && (
                        <>
                            <ModalHeader toggle={toggle}>Update Room</ModalHeader>
                        </>
                    )}

                    <ModalBody>
                        <p hidden={(roomMode === "edit")}> You can change only room rates</p>
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
                                        disabled
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
                                        disabled />
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
                                        disabled
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
                                        disabled={(roomMode === "view" || hotelMode === "view")}
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
                                        disabled
                                    />
                                    <Label check>
                                        Is Breakfast included.
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input type="checkbox"
                                        id="acNonAcStatus"
                                        name="acNonAcStatus"
                                        checked={roomData.acNonAcStatus}
                                        disabled
                                    />
                                    <Label check>
                                        AC
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="roomImage">
                                        Room Image
                                    </Label>
                                    <FormText className="ms-3">
                                        Choose Images
                                    </FormText>
                                    <Input
                                        id="roomImage"
                                        name="roomImage"
                                        type="file"
                                        disabled
                                    />
                                    
                                </FormGroup>
                            </Col>
                        </Row> */}
                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="image1">
                                                    Room Image
                                                </Label>
                                                <FormText className="ms-3">
                                                    Choose Image
                                                </FormText>
                                                <Input
                                                    id="image1"
                                                    name="image1"
                                                    type="file"
                                                    onChange={handleRoomImageChange}
                                                    disabled={(roomMode === "view")}
                                                />
                                                <div className="text-center">
                                                    <img id="roomImg" src="" width="200" className="mt-3" />
                                                </div>
                                            </FormGroup>
                                        </Col>
                    </ModalBody>
                    <ModalFooter>
                        <div hidden={roomMode === "view"}>
                            <Button color="primary" onClick={() => { updateRoom(); toggle(); }}>
                                Update Room
                            </Button>{' '}
                        </div>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </BaseAdmin>
        </>
    )
}

export default EditViewHotel