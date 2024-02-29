import React, { useEffect, useState } from "react";
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
  FormText,
  Table,
} from "reactstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  insertPackage, updatePackage as updatePackages
} from "../../../services/admin/packageService";
import "./package.css";

import "bootstrap/dist/css/bootstrap.min.css";
import BaseAdmin from "../../../components/BaseAdmin";
import { getHotelsByDestCity } from "../../../services/admin/hotelService";
import { getActivitiesByDestCity, } from "../../../services/admin/activityServices";
import { getPackageById } from "../../../services/admin/packageService";
import { getCities } from "../../../services/commonService";

const EditViewPackage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const packageMode = location.state?.mode;

  // Hotel ID fromo request URL
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState({
    pkgName: "",
    pkgType: "",
    destinationCity: "",
    noOfNights: 2,
    flightStatus: false,
    dropStatus: false,
    hotel: {},
    room: {},
    packageBaseRate: 0,
    packageActiveStatus: true,
    pkgActivity: [],
  });

  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  // const [pkgActivity, setPkgActivity] = useState([{
  //     "activities":{},
  //     "dayOfActivity": 0,
  //     "pkgActStatus":true
  // }]);

  const [pkgActivity, setPkgActivity] = useState([]);

  const resetPackageData = () => { 
    setPackageData({
    pkgName: "",
    pkgType: "",
    destinationCity: "",
    noOfNights: 2,
    flightStatus: false,
    dropStatus: false,
    hotel: {},
    room: {},
    packageBaseRate: 0,
    packageActiveStatus: true,
    pkgActivity: [],
    })
  };

  useEffect(() => {
    getDestinations();
    getPackage();
  }, []);

  //API Calls
  const getDestinations = () => {
    setCities(getCities());
  };
  const getPackage = () => {
    console.log("id",packageId);
    getPackageById(packageId)
      .then((resp) => {
        console.log(resp);
        setPackageData(resp);

      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
      });
  };

  const getHotelByDestCity = (destCity) => {
    getHotelsByDestCity(destCity)
      .then((resp) => {
        console.log(resp);
        setHotels(resp);
        //Reset previously selected data
        packageData.hotel = {};
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
      });
  }

  const getActByDestCity = (destCity) => {
    getActivitiesByDestCity(destCity)
      .then((resp) => {
        console.log(resp);
        setActivities(resp);
        //Reset previously selected data
        packageData.pkgActivity = [];
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
      });
  }

  
  //Data binding
  const handleChange = (event, property) => {
    if (property === "dropStatus" || property === "flightStatus") {
      setPackageData({ ...packageData, [property]: event?.target?.checked });
    } else {
      setPackageData({ ...packageData, [property]: event.target.value });
    }
  };

  const handleCityChange = (event, property) => {
    setPackageData({ ...packageData, [property]: event?.target?.value });
    // On Change of Destination fetch Hotels & Activities of that destinations.
    getHotelByDestCity(event?.target?.value);
    getActByDestCity(event?.target?.value);
  };

  const handleHotelChange = (event, property) => {
    if (event.target.value === "NA") {
      packageData.hotel = {};
      packageData.room = {};
      setRooms([]);
    } else {
      setPackageData({
        ...packageData,
        [property]: JSON.parse(event.target.value),
      });
      packageData.hotel = JSON.parse(event.target.value);
      setRooms(packageData.hotel.rooms);
    }
    console.log(hotels[event?.target?.value]);
  };

  const handleRoomChange = (event, property) => {
    if (event.target.value === "NA") {
      packageData.room = {};
    } else {
      setPackageData({
        ...packageData,
        [property]: JSON.parse(event.target.value),
      });
      packageData.room = JSON.parse(event.target.value);
      console.log(packageData.room);
    }
  };

  const handleActivityChange = (event, property, dayOfActivity) => {
    if (event.target.value === "NA") {
      let ind = pkgActivity
        .map(function (activity) {
          return activity.dayOfActivity;
        })
        .indexOf(dayOfActivity + 1);
      pkgActivity.splice(ind, 1);
    } else {
      let act = {
        activities: JSON.parse(event.target.value),
        dayOfActivity: dayOfActivity + 1,
        pkgActStatus: true,
      };
      let ind = pkgActivity
        .map(function (activity) {
          return activity.dayOfActivity;
        })
        .indexOf(dayOfActivity + 1);
      if (ind == -1) {
        pkgActivity.push(act);
      } else {
        pkgActivity.splice(ind, 1, act);
      }
      setPackageData({
        ...packageData,
        [property]: pkgActivity,
      });
    }
    console.log(packageData.pkgActivity);
  };

  const activitiesDOM = (activities) => {
    let content = [];

    for (let i = 0; i < packageData.noOfNights; i++) {
      content.push(
        <Col md="3">
          <Label for="Day">Day {i + 1}</Label>
          <Input
            id={"Day" + (i + 1)}
            name={"Day" + (i + 1)}
            type="select"
            key={i}
            onChange={(e) => handleActivityChange(e, "pkgActivity", i)}
            disabled={(packageMode === "view")}
          >
            <option value="NA">Select Activity</option>
            {activities.map((act, j) => {
              return (
                <option value={JSON.stringify(act)} key={j}>
                  {act.activityName}
                </option>
              );
            })}
          </Input>
        </Col>
      );
    }
    return content;
  };

  const updatePackage = (event) => {
    event.preventDefault();
    console.log(packageData);
    updatePackages(packageData)
        .then((resp) => {
            console.log("Package :: " + resp);
                resetPackageData();
                navigate("/admin/packages");
                toast.success("Package Updated Succussfully");
            

        })
        .catch((error) => {
            console.log("Error log" + error);
            toast.error("Eror : " + error?.response?.data);
        });
}

  return (
    <>
      <BaseAdmin>
        <Row className="mt-4 mb-4">
          <Col sm={{ size: 10, offset: 1 }}>
                 <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            {(packageMode === "view") && (
                                <>
                                    <CardHeader>
                                        <h3>View Hotel</h3>
                                    </CardHeader>
                                </>
                            )}
                            {(packageMode === "edit") && (
                                <>
                                    <CardHeader>
                                        <h3>Update Package</h3>
                                    </CardHeader>
                                </>
                            )}
              <CardBody>
                <Form>
                  <h5>Package Details</h5>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="pkgName">Package Name :</Label>
                        <Input
                          id="pkgName"
                          name="pkgName"
                          placeholder="Enter Package Name"
                          type="text"
                          value={packageData.pkgName}
                          onChange={(e) => handleChange(e, "pkgName")}
                          disabled={(packageMode === "view")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="pkgType">Package Type</Label>
                        <Col>
                          <Input
                            id="pkgType"
                            name="pkgType"
                            type="select"
                            value={packageData.pkgType}
                            onChange={(e) => handleChange(e, "pkgType")}
                            disabled={(packageMode === "view")}
                          >
                            <option> Leasure </option>
                            <option> Family </option>
                            <option> Couple </option>
                            <option> Independent Tour </option>
                            <option> holistay </option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="destinationCity">Destination</Label>
                        <Input
                          id="destinationCity"
                          name="destinationCity"
                          type="select"
                          value={packageData.destinationCity}
                          onChange={(e) =>
                            handleCityChange(e, "destinationCity")
                          }
                          disabled={(packageMode === "view")}
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
                    <Col md={4}>
                      <FormGroup>
                        <Label for="noOfNights">Number of Nights</Label>
                        <Input
                          id="noOfNights"
                          name="noOfNights"
                          type="select"
                          value={packageData.noOfNights}
                          onChange={(e) => handleChange(e, "noOfNights")}
                          disabled={(packageMode === "view")}
                        >
                          <option> 2 </option>
                          <option> 3 </option>
                          <option> 4 </option>
                          <option> 5 </option>
                          <option> 6 </option>
                          <option> 7 </option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr className="solid" />
                  <h5>Hotel Selection</h5>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="hotel">Select Hotel</Label>

                        <Input
                          id="hotel"
                          name="hotel"
                          type="select"
                          onChange={(e) => handleHotelChange(e, "hotel")}
                          disabled={(packageMode === "view")}
                        >
                          <option value="NA">Select Hotel</option>
                          {hotels.map((hotel, i) => {
                            return (
                              <option value={JSON.stringify(hotel)} key={i}>
                                {hotel.hotelName}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="hotel">Select Room</Label>
                        <Input
                          id="room"
                          name="room"
                          type="select"
                          onChange={(e) => handleRoomChange(e, "room")}
                          disabled={(packageMode === "view")}
                        >
                          <option value="NA">Select Room</option>
                          {rooms.map((room, i) => {
                            return (
                              <option value={JSON.stringify(room)} key={i}>
                                {room.roomType} (₹{room.roomRate})
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr className="solid" />
                  <h5>Flight Section</h5>
                  <Row>
                    <Col md="auto">
                      <FormGroup check inline>
                        <Input
                          type="checkbox"
                          id="flightStatus"
                          name="flightStatus"
                          checked={packageData.flightStatus}
                          onChange={(e) => handleChange(e, "flightStatus")}
                          disabled={(packageMode === "view")}
                        />
                        <Label check>Flight Inclusive</Label>
                      </FormGroup>
                    </Col>
                    <Col md="auto">
                      <FormGroup check inline>
                        <Input
                          type="checkbox"
                          id="dropStatus"
                          name="dropStatus"
                          checked={packageData.dropStatus}
                          onChange={(e) => handleChange(e, "dropStatus")}
                          disabled={(packageMode === "view")}
                        />
                        <Label check>
                          Hotel Drop/Pick Facility From Airport
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr className="solid" />
                  <h5>Activities</h5>
                  <Row>{activitiesDOM(activities)}</Row>
                  <hr className="solid" />
                  <Row>
                    <Col md={6}>
                      <FormGroup row>
                        <Label for="packageBaseRate">
                          Enter Basic Package Rate:
                        </Label>
                        <Col>
                          <Input
                            id="packageBaseRate"
                            name="packageBaseRate"
                            placeholder="Package Rate"
                            type="number"
                            value={packageData.packageBaseRate}
                            onChange={(e) => handleChange(e, "packageBaseRate")}
                            disabled={(packageMode === "view")}
                          />
                          Per Head (Rate Incl. of Activity charges and Pick up
                          Drop from Airport)
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="text-center mt-3">
                    <Col md={12}>
                      <div>
                        <Button color="primary" onClick={updatePackage} hidden={(packageMode === "view")}>
                          Update Package
                        </Button>
                        <Button
                          className="ms-5"
                          color="danger"
                          tag={ReactLink}
                          to="/admin/packages"
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
      </BaseAdmin>
    </>
  );
};

export default EditViewPackage;
