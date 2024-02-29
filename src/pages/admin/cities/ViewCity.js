import { useState, useEffect } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import BaseAdmin from "../../../components/BaseAdmin";
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
import { getCityById } from "../../../services/city-service";
import { toast } from "react-toastify";


const ViewCity=()=>{

    const [cityData,setCityData]=useState({
        cityName: "",
        state:""
    });

    const { cityId } = useParams();
    
        useEffect(() => {
            getCity(cityId);
        },[])

    const getCity =(cityId)=>{
        console.log(cityData);
        
        getCityById(cityId).then(data =>{
            console.log(data);
            setCityData({ ...data })
        }).catch((error)=>{
            console.log("error");
            console.log("Error Log");
            toast.error("Error while View");
        })
    }
    
    return(
        <BaseAdmin>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
              <CardHeader>
                <h3>View City</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">City Name</Label>
                        <Input
                          id="cityName"
                          name="cityName"
                          type="text"
                          value={cityData.cityName}
                         disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">State</Label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          value={cityData.state}
                         disabled
                        />
                      </FormGroup>
                    </Col>
          
                    </Row>
                 
                    <div className="text-center">
                              <Button
                               className="ms-5"
                               color="danger"
                               tag={ReactLink}
                               to="/admin/cities"
                              >
                              BACK
                              </Button>
                    </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BaseAdmin>
    )
}

export default ViewCity;