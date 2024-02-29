import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseAdmin from "../../../components/BaseAdmin";
import {
  getAllDestination,
  getCities,
  saveCities,
} from "../../../services/commonService";
import { toast } from "react-toastify";
import { getAnalysis } from "../../../services/booking-service";

const Dashboard = ({ title = "Welcome to our Dashboard", children }) => {
  const [cities, setCities] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  useEffect(() => {
    getDestinations();
    getAnalytics();
  }, []);

  //API Calls
  const getDestinations = () => {
    if (getCities() == undefined || getCities() == null) {
      getAllDestination()
        .then((resp) => {
          console.log(resp);
          saveCities(resp);
          setCities(resp);
          console.log(cities);
        })
        .catch((error) => {
          console.log("Error log" + error);
          toast.error("Error :: " + error?.response?.data?.message);
        });
    }
  };

  const getAnalytics = () => {
    getAnalysis()
      .then((resp) => {
        console.log(resp);
        setAnalysis(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
      });
  };

  return (
    <>
      <BaseAdmin>
        <div className="container-fluid p-0 m-0">
          <Container>{children}</Container>
        </div>
      </BaseAdmin>
      <Row className="mt-5 text-center" >
        <Col md="4" >
          <Card body className="my-4" style={{ width: "18rem", height: "10rem", backgroundColor: 'aliceblue', boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }} >
            <CardTitle tag="h3">Total Revenue Generated</CardTitle>
            <CardText tag="h2">
              {analysis.totalRevenue}
            </CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body className="my-4" style={{ width: "18rem", height: "10rem", backgroundColor: 'aliceblue', boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }} >
            <CardTitle tag="h3">Total Tour Packages</CardTitle>
            <CardText tag="h2">
              {analysis.totalPackages}
            </CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body className="my-4" style={{ width: "18rem", height: "10rem", backgroundColor: 'aliceblue', boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }} >
            <CardTitle tag="h3">New Bookings</CardTitle>
            <CardText tag="h2">
              {analysis.newBookings}
            </CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body className="my-4" style={{ width: "18rem", height: "10rem", backgroundColor: 'aliceblue', boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }} >
            <CardTitle tag="h3">Cancelled Bookings</CardTitle>
            <CardText tag="h2">
              {analysis.cancelledBookings}
            </CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body className="my-4" style={{ width: "18rem", height: "10rem", backgroundColor: 'aliceblue', boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }} >
            <CardTitle tag="h3">Sold Tours</CardTitle>
            <CardText tag="h2">
              {analysis.soldTours}
            </CardText>
          </Card>
        </Col>

      </Row>

    </>
  );
};
export default Dashboard;