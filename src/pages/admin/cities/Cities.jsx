import React, { useState, useEffect } from 'react'
import BaseAdmin from '../../../components/BaseAdmin'
import Dashboard from '../Dashboard/Dashboard'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import { NavLink as ReactLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { getAllCities , deleteCity as deleteCityService } from '../../../services/city-service'
import { getCities } from '../../../services/commonService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cities = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const[cities,setCities]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCities();
      }, []);
      const getCities=(event)=>{
          getAllCities()
          .then((resp)=>{
              console.log(resp);
              setCities(resp);
          })
      }
    const viewCities=(cityId)=>{
        console.log(cityId+"view");
        navigate(`/admin/viewCity/${cityId}`);
    };
   
    const deleteCity = (cityId) => {
        deleteCityService(cityId)
        .then((resp) => {
            console.log(resp);
            toast.success('City deleted successfully'); // Display success toast
            getCities();
        })
        .catch(error => {
            console.error(error);
            
        });
    };
    
    return (
        <>
           <BaseAdmin>
               <Container>
                   <Row className="mt-4">
                       <Col md={8}>
                       <h3>Cities</h3>
                       </Col>
                       <Col md={4}>
                        <Button
                         color="primary"
                         className="float-end"
                            tag={ReactLink}
                        to="/admin/AddCity"
                         >
                         Add New City
                         </Button>
                    </Col>
                   </Row>
               </Container>
               <Container>
                   <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                            <thead>
                                <tr className="text-center">
                                    <th>City Id</th>
                                    <th>City Name</th>
                                    <th>State</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities?.map((city,i)=>{
                                    return(
                                        <tr id={city.cityId} key={i} >
                                            {/* <td >
                                            {listItems} </td> */}
                                            <td align="right">CS{city.cityId}</td> 
                                            <td>{city.cityName}</td>
                                            <td>{city.state}</td>
                                            <td>
                                                <div className="text-center">
                                                    <Button color="primary"
                                                         onClick={()=>viewCities(city.cityId)}
                                                    >
                                                        View 
                                                    </Button>
                                                    <Button
                                                    className="ms-5"
                                                    color="danger"
                                                    onClick={() => deleteCity(city.cityId)}
                                                    >
                                                    Delete City
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
    )
}

export default Cities;