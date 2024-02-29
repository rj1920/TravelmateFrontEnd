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
import { getAllActivities } from "../../../services/admin/activityServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseAdmin from "../../../components/BaseAdmin";

const Activities = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = (event) => {
    getAllActivities()
      .then((resp) => {
        console.log(resp);
        setActivities(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while getting Activity data");
      });
  };

  const viewActivity = (activityId) => {
    console.log(activityId + " View");
    navigate(`/admin/viewActivity/${activityId}`);

  };

  const editActivity = (activityId) => {
    console.log(activityId + " edit");
    navigate(`/admin/editActivity/${activityId}`);
  };

  // const canEdit = (flight) => {
  //   let currentDate = new Date();
  //   let departDateTime = new Date(flight.departDateTime)
  //   return ((departDateTime - currentDate) / (60 * 1000 * 60) > 24) ? true : false;
  // }
  return (
    <>
      <BaseAdmin>
        <Container>
          <Row className="mt-4">
            <Col md={8}>
              <h3>Activities</h3>
            </Col>
            <Col md={4}>
              <Button
                color="primary"
                className="float-end"
                tag={ReactLink}
                to="/admin/AddActivity"
              >
                Add New Activity
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
            <thead>
              <tr className="text-center">
                <th>Activity Name</th>
                <th>Activity Address</th>
                <th>Destination</th>
                <th>Type</th>
                <th>Rate/Head (INR)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity,i) => {
                return (
                  <tr id={activity.activityId} key={i}>
                    <td>{activity.activityName}</td>
                    <td>{activity.activityAddress}</td>
                    <td>{activity.destinationCity}</td>
                    <td>{activity.activityType}</td>
                    <td align="right">{activity.activityRate}
                    </td>
                    <td>
                      <div className="text-center">

                        <Button
                          color="primary"
                          onClick={() => viewActivity(activity.activityId)}
                        >
                          View
                        </Button>
                        <Button
                              className="ms-4"
                              color="info"
                              onClick={() => editActivity(activity.activityId)}
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

export default Activities;
