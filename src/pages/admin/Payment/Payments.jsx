import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Label,
    Row,
    Table
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseAdmin from "../../../components/BaseAdmin";
import { doLogout } from "../../../auth";
import { getAllPayments } from "../../../services/payment-service";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [payment, setPayment] = useState({});

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = (event) => {
        getAllPayments()
            .then((resp) => {
                console.log(resp);
                setPayments(resp);
            })
            .catch((error) => {
                console.log("Error log" + error);
                toast.error("Error :: " + error?.response?.data?.message);
                if (error?.response?.data?.message.includes("JWT expired")) {
                    doLogout(() => {
                        navigate("/login")
                    })
                }
            });
    };

    const viewPayment = (payment) => {
        setPayment(payment);
        toggle();
    }

    return (
        <>
            <BaseAdmin>
                <Container>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h3>Payments</h3>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                        <thead>
                            <tr className="text-center">
                                <th>Transaction ID</th>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Payment Mode</th>
                                <th>Payment Status</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.map((payment, i) => {
                                return (
                                    <tr id={payment.paymentId} key={i}>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.user.userId}</td>
                                        <td>{payment.user.name}</td>
                                        <td>{payment.modeOfPayment}</td>
                                        <td>{payment.paymentStatus}</td>
                                        <td>{payment.totalAmount}</td>
                                        <td>
                                            <div className="text-center">
                                                <Button
                                                    color="primary"
                                                    onClick={() => viewPayment(payment)}
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={modal} toggle={toggle} centered={true} scrollable={true} size={"lg"}>
                    <ModalHeader toggle={toggle}>View Payment</ModalHeader>
                    <ModalBody style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
                        <Row >
                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Tarnsaction ID :</Label> <p>{payment?.paymentId}</p>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Customer ID :</Label> <p>{payment?.user?.userId}</p>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Customer Name :</Label> <p>{payment?.user?.name}</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Payment Mode :</Label> <p>{payment?.modeOfPayment}</p>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Amount :</Label> <p>{payment?.totalAmount}</p>
                                </FormGroup>
                            </Col>

                            <Col md={{ size: 4 }}>
                                <FormGroup inline>
                                    <Label>Debit Account :</Label> <p>{payment?.debitAccountNumber}</p>
                                </FormGroup>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </BaseAdmin>
        </>
    );
};

export default Payments;
