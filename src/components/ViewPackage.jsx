import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap';
import { getPackageById } from '../services/admin/packageService';
import { toast } from "react-toastify";
import Base from './base'
import { getByFromDestcity } from '../services/admin/flightServices';

const ViewPackage = () => {

    const [departureFlight, setDepartureFlight] = useState({});
    const [flightData, setFlightData] = useState([]);

    const { packageId } = useParams();
    const [pkgData, setPkgData] = useState({
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


    useEffect(() => {
        getPackage(packageId);
    }, [])


    useEffect(() => {
    }, [departureFlight]);

    const getPackage = (packageId) => {

        console.log(pkgData);
        getPackageById(packageId).then(data => {
            console.log(data);
            setPkgData({ ...data });
            getFlights();

        }).catch((error) => {
            console.log("error");
            console.log("Error log");
            toast.error("Eror while signup");
        })
    }



    const getFlights = (event) => {
        getByFromDestcity(localStorage.getItem("fromCity"), localStorage.getItem("destinationCity"))
            .then((resp) => {
                console.log(resp);
                setDepartureFlight(resp);
                setFlightData(resp);
                setPkgData({ ...pkgData, ["departureFlight"]: setDepartureFlight })
            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Eror while getting flight data");
            });
    };
    return (
        <Base>
            <div>ViewPackage</div>
            <Row className="mt-4">
                <Col sm={{ size: 10, offset: 1 }}>
                    <Card>
                        <CardHeader>
                            <h3>Add Hotel</h3>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Label>{pkgData.pkgName}</Label>
                                <Label>{pkgData.pkgType}</Label>
                                <p>{pkgData.hotel.hotelId}</p>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Base>
    )
}

export default ViewPackage