import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Tooltip,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { getAllFlights } from "../../../services/admin/flightServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseAdmin from "../../../components/BaseAdmin";
import { doLogout,setLogin } from "../../../auth";

const Flights = () => {
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = (event) => {
    getAllFlights()
      .then((resp) => {
        console.log(resp);
        setFlights(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while getting flight data :: " + error?.response?.data?.message);
        if(error?.response?.data?.message.includes("JWT expired")){
          doLogout(() => {
            navigate("/login")
          })
        }
      });
  };

  const viewFlight = (flightId) => {
    console.log(flightId + " View");
    navigate(`/admin/viewFlight/${flightId}`);

  };

  const editFlight = (flightId) => {
    console.log(flightId + " edit");
    navigate(`/admin/editFlight/${flightId}`);
  };

  // TO
  const canEdit = (flight) => {
    let currentDate = new Date();
    let departDateTime = new Date(flight.departDateTime)
    return ((departDateTime - currentDate) / (60 * 1000 * 60) > 24) ? true : false;
  }
  return (
    <>
      <BaseAdmin>
        <Container>
          <Row className="mt-4">
            <Col md={8}>
              <h3>Flights</h3>
            </Col>
            <Col md={4}>
              <Button
                color="primary"
                className="float-end"
                tag={ReactLink}
                to="/admin/addFlight"
              >
                Add New Flight
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
            <thead>
              <tr className="text-center">
                <th>Airline Name</th>
                <th>Flight Code</th>
                <th>From</th>
                <th>To</th>
                <th>Departure At</th>
                <th>Available Seats</th>
                <th>Fare</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight,i) => {
                return (
                  <tr id={flight.flightId} key={i}>
                    <td>{flight.companyName}</td>
                    <td>{flight.flightCode}</td>
                    <td>{flight.fromCity}</td>
                    <td>{flight.destCity}</td>
                    <td>{flight.departDateTime}</td>
                    <td>{flight.availableSeats}</td>
                    <td>{flight.ratePerSeat}
                    </td>
                    <td>
                      <div className="text-center">

                        <Button
                          color="primary"
                          onClick={() => viewFlight(flight.flightId)}
                        >
                          View
                        </Button>
                        {
                          !canEdit(flight) && (
                            <>
                              <i className="bi bi-info-circle-fill" data-toggle="tooltip" title="Flight can't be modified as less than 24Hrs left for departure"></i>
                            </>
                          )
                        }

                        {
                          canEdit(flight) && (
                            <Button
                              className="ms-4"
                              color="info"
                              onClick={() => editFlight(flight.flightId)}
                            >
                              Edit
                            </Button>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </BaseAdmin>
    </>
  );
};

export default Flights;
