import React from 'react';
import Base from './base';
import Footer from './Footer';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'

const AboutUs = () => {
  return (
    <Base>
      <Row>
        <Col>
          <br></br>
          <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)", backgroundColor: 'aliceblue' }}>
            <CardHeader>
              <h2>About Us</h2>
            </CardHeader>
            <CardBody>
              <p>We are a travel management system that is dedicated to providing you with the best travel experience possible.</p>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <div >
            <br></br>
            <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)", backgroundColor: 'aliceblue' }}>
              <CardHeader>
                <h2>Our Mission</h2>
              </CardHeader>
              <CardBody>
                <p>Our mission is to help you plan and book your travel seamlessly, providing you with all the necessary tools and information to make informed decisions.</p>
              </CardBody>
            </Card>
          </div>
        </Col>
        <Col>
          <br></br>
          <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)", backgroundColor: 'aliceblue' }}>
            <CardHeader>
              <h2>Our Team</h2>
            </CardHeader>
            <CardBody>
              <p>Our team is made up of travel enthusiasts who are passionate about helping people explore the world. We are dedicated to providing you with excellent customer service and support.</p>
            </CardBody>
          </Card>

        </Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <div>
          <Row>
            <Col>
            </Col>
            <Col>

              <Card style={{ boxShadow: "0px 0px 15px rgb(0,0,255)", backgroundColor: 'aliceblue' }}>
                <CardHeader>
                  <h2>Contact Us</h2>
                </CardHeader>
                <CardBody>
                  <p>If you have any questions or concerns, please don't hesitate to contact us. We are available 24/7 to assist you with anything you need.</p>
                  <ul>
                    Email: info@travelmate.com
                    <br></br>
                    Phone: 1-800-965415
                    <br></br>
                    Address: Main Road,Hinjewadi,Pune
                    <br></br>
                  </ul>
                </CardBody>
              </Card>

            </Col>
            <Col>
            </Col>

          </Row>
        </div>
      </center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Footer></Footer>
    </Base >
  );
};

export default AboutUs;