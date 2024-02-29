import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { getAllHotels } from "../../../services/admin/hotelService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseAdmin from "../../../components/BaseAdmin";
import { doLogout } from "../../../auth";

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = (event) => {
    getAllHotels()
      .then((resp) => {
        console.log(resp);
        setHotels(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
        if(error?.response?.data?.message.includes("JWT expired")){
          doLogout(() => {
            navigate("/login")
          })
        }
      });
  };


  const viewHotel = (hotelId) => {
    console.log(hotelId + " View");
    navigate(`/admin/viewHotel/${hotelId}`,{ state: { mode:"view" } } );

  };

  const editHotel = (hotelId) => {
    console.log(hotelId + " edit");
    navigate(`/admin/editHotel/${hotelId}`,{ state: { mode:"edit" } } );
  };

  const calculateNoOfAvailableRooms = (hotel) => {
    let availableRooms = 0;
    hotel.rooms.map(room=>{
      availableRooms+=room.availableRooms;
    })
    return availableRooms;
  };
  const calculateBasicRoomRate = (hotel) => {
    let availableRooms = hotel.rooms.filter(room => room.availableRooms > 0);
    let baseRate = (availableRooms.length === 0) ? 0 : Math.min(...availableRooms.map(room => room.roomRate));
    return baseRate;
  };

  return (
    <>
        <BaseAdmin>
          <Container>
            <Row className="mt-4">
              <Col md={8}>
                <h3>Hotels</h3>
              </Col>
              <Col md={4}>
                <Button
                  color="primary"
                  className="float-end"
                  tag={ReactLink}
                  to="/admin/addHotel"
                >
                  Add New Hotel
                </Button>
              </Col>
            </Row>
          </Container>
          <Container>
            <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}> 
              <thead>
                <tr className="text-center">
                  <th>Hotel Name</th>
                  <th>Type of Hotel</th>
                  <th>City</th>
                  <th>Available Rooms</th>
                  <th>Min.Room Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels?.map((hotel,i) => {
                  return (
                    <tr id={hotel.hotelId}  key={i}>
                      <td>{hotel.hotelName}</td>
                      <td>{hotel.hotelType}</td>
                      <td>{hotel.destinationCity}</td>
                      <td className="text-center">{calculateNoOfAvailableRooms(hotel)}</td>
                      <td className="text-center">{calculateBasicRoomRate(hotel)}</td>
                      <td>
                        <div className="text-center">
                          <Button
                            color="primary"
                            onClick={() => viewHotel(hotel.hotelId)}
                          >
                            View
                          </Button>

                          <Button
                            className="ms-4"
                            color="info"
                            onClick={() => editHotel(hotel.hotelId)}
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
        </BaseAdmin>
    </>
  );
};

export default Hotels;
