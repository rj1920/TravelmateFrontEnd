import React from 'react'
import Base from './base'
import Footer from './Footer'
import { FaTelegramPlane } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';
const ContactUs = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    toast.success("Thank you for your valuable feedback..")
    navigate('/');


  }
  return (
    <Base>
      <div className="container mt-5">
        <h2 className="mb-3" style={{ textAlign: 'center' }}>Contact Us...<FaTelegramPlane /></h2>
        <form onSubmit={onSubmit}>
          <Row>
            <Col>
            </Col>
            <Col style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
              <div className="mb-3">
                <br></br>
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <br></br>
                <input className="form-control" type="text" id="name" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <br></br>
                <input className="form-control" type="email" id="email" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <br></br>
                <textarea className="form-control" id="message" required />
              </div>
              <center>
                <button className="btn btn-danger mb-3" type="submit">
                  {formStatus}
                </button>
              </center>


            </Col>
            <Col></Col>
          </Row>
        </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>\
      <Footer></Footer>
    </Base>

  )
}
export default ContactUs