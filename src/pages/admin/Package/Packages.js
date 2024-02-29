import React, { useEffect, useState } from "react";
import { Table, Container, Button, Col, Row } from "reactstrap";
import BaseAdmin from "../../../components/BaseAdmin";
import { NavLink as ReactLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../../auth";
import { getAllPackages } from "../../../services/admin/packageService";

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = (event) => {
    getAllPackages()
      .then((resp) => {
        console.log(resp);
        setPackages(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Error :: " + error?.response?.data?.message);
        if (error?.response?.data?.message.includes("JWT expired")) {
          doLogout(() => {
            navigate("/login");
          });
        }
      });
  };

  const viewPackage = (pkg) => {
    console.log(pkg.packageId + " id");
    navigate(`/admin/viewPackage/${pkg.packageId}`, { state: { mode: "view" }});
  };

  const editPackage = (pkg) => {
    console.log(pkg + " edit");
    navigate(`/admin/editPackage/${pkg.packageId}`, {
      state: { mode: "edit" },
    });
  };

  return (
    <BaseAdmin>
      <Container>
        <Row className="mt-4">
          <Col md={8}>
            <h3>Packages</h3>
          </Col>
          <Col md={4}>
            <Button
              color="primary"
              className="float-end"
              tag={ReactLink}
              to="/admin/addPackage"
            >
              Create New Package
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Table bordered hover responsive striped style={{ boxShadow: "0px 0px 15px rgb(0,0,255,.7)" }}>
          <thead>
            <tr className="text-center">
              <th>Package Name</th>
              <th>Type of Package</th>
              <th>Destination</th>
              {/* <th>No.of Bookings</th> */}
              <th>Basic Rate</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {packages
              ?.filter((pkg) => pkg.packageActiveStatus)
              ?.map((pkg, i) => {
                return (
                  <>
                    <tr id={pkg.packageId} key={i} className="text-center">
                      <td>{pkg.pkgName}</td>
                      <td>{pkg.pkgType}</td>
                      <td>{pkg.destinationCity}</td>
                      {/* <td>0</td> */}
                      <td>{pkg.packageBaseRate}</td>
                      <td>
                        <div className="text-center">
                          <Button
                            color="primary"
                            onClick={() => viewPackage(pkg)}
                          >
                            View
                          </Button>

                          <Button
                            className="ms-4"
                            color="info"
                            onClick={() => editPackage(pkg)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </BaseAdmin>
  );
};

export default Packages;
