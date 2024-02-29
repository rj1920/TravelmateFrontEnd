import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
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
} from "reactstrap";
import { insertCity } from "../../../services/city-service";
import BaseAdmin from "../../../components/BaseAdmin";
import { getCities } from "../../../services/commonService";

const AddCity = () => {
  //Default Values
  const [cityData, setCityData] = useState({
    cityName: "",
    state: ""
  });

  //Resetting the form
  const resetCityData = () => {
    setCityData({
        cityName: "",
        state: ""
    });
  };

  useEffect(() => {}, [cityData]);
  const navigate = useNavigate();

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //Data binding
  const handleChange = (event, property) => {
    setCityData({ ...cityData, [property]: event.target.value });
  }

  const addCity = (event) => {
    event.preventDefault();
    console.log(cityData);
    {
      insertCity(cityData)
        .then((resp) => {
          console.log(resp);
          console.log("City Added successfully");
          toast.success("City Added successfully");
          resetCityData();
          navigate("/admin/cities");
        })
        .catch((error) => {
          console.log("Error log" + error);
          toast.error("Eror while adding data to City");
          setError({
            errors: error,
            isError: true,
          });
        });
    }
  };

  return (
    <>
      <BaseAdmin>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
              <CardHeader>
                <h3>Add City</h3>
                <br></br>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="cityName">City Name</Label>
                        <Input
                          id="cityName"
                          name="cityName"
                          placeholder="Enter City Name"
                          type="text"
                          value={cityData.cityName}
                          onChange={(e) => handleChange(e, "cityName")}
                        />
                      </FormGroup>
                    </Col>
                   </Row>
                   <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="Enter State"
                          type="text"
                          value={cityData.state}
                          onChange={(e) => handleChange(e, "state")}
                        />
                      </FormGroup>
                    </Col>
                   </Row>

                  <div className="text-center">
                    <Button color="primary" onClick={addCity}>
                      Add City
                    </Button>
                    <Button
                      className="ms-5"
                      color="danger"
                      tag={ReactLink}
                      to="/admin/cities"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="secondary"
                      className="ms-5"
                      type="reset"
                      onClick={() => resetCityData()}
                    >
                      Reset{" "}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BaseAdmin>
    </>
  );
};

export default AddCity;
