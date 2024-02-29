import { NavLink as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { doPayment } from "../services/payment-service";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import Base from "./base";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../auth";
import { useState } from "react";
const Payment = () => {
  const navigate = useNavigate();

  var date = new Date();
  var currentDate =
    date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2)
    + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2);

  console.log(currentDate);

  const [paymentData, setPaymentData] = useState({
    "modeOfPayment": "",
    "debitAccountNumber": "",
    "creditAccountNumber": 0,
    "totalAmount": localStorage.getItem('totalAmount1'),
    "paymentStatus": "Completed",
    "paymentDate": currentDate,
    "bookings": {
      "bookingId": localStorage.getItem('bookingId')
    },
    "user": getCurrentUserDetail()
  });

  const resetPaymet = () => {
    setPaymentData({
      "modeOfPayment": "",
      "debitAccountNumber": "",
      "creditAccountNumber": 0,
      "totalAmount": localStorage.getItem('totalAmount1'),
      "paymentStatus": "Completed",
      "paymentDate": currentDate,
      "bookings": {
        "bookingId": localStorage.getItem('bookingId')
      },
      "user": getCurrentUserDetail()
    })
  }

  const handlePaymentOptionChange = (event, property) => {
    setPaymentData({ ...paymentData, [property]: event?.target?.value });
  }
  const doPayments = () => {
    doPayment(paymentData)
      .then((resp) => {
        toast.success("Payment Done. Booking Confirmed.");
        localStorage.removeItem("bookingId");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("flightId");
        localStorage.removeItem("hotelId");
        localStorage.removeItem("roomId");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror : " + error?.response?.data);
      });
  }

  return (
    <Base>
      <Row className="mt-4">
        <Col sm={{ size: 10, offset: 1 }}>
          <Card>
            <CardHeader>
              <h3>Do Payment</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="modeOfPayment">Mode of Payment</Label>
                      <Input
                        id="modeOfPayment"
                        name="modeOfPayment"
                        type="select"
                        value={paymentData.modeOfPayment}
                        onChange={(e) => handlePaymentOptionChange(e, "modeOfPayment")}
                      >
                        <option value="NA"> Select Type </option>
                        <option value="UPI"> UPI </option>
                        <option value="DebitCard"> Debit Card </option>
                        <option value="CreditCard"> Credit Card </option>
                        <option value="IntenetBanking"> Internet Banking </option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activityName">Debit Account Number</Label>
                      <Input
                        id="debitAccountNumber"
                        name="debitAccountNumber"
                        placeholder="Enter Debit Card Number Name"
                        type="text"
                        value={paymentData.debitAccountNumber}
                        onChange={(e) => handlePaymentOptionChange(e, "debitAccountNumber")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="auto">
                    <h3>Amount to pay {paymentData.totalAmount}</h3>
                  </Col>
                </Row>



                <div className="text-center">
                  <Button color="primary" onClick={doPayments}>
                    Do Payment
                  </Button>
                  <Button
                    className="ms-5"
                    color="danger"
                    tag={ReactLink}
                    to="/home"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    className="ms-5"
                    type="reset"
                    onClick={() => resetPaymet()}
                  >
                    Reset{" "}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Base>
  );

};

export default Payment;