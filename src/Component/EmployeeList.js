import React, { useContext, useEffect, useState } from "react";
import Employee from "./Employee";
import { EmployeeContext } from "../context/EmployeeContext";
import { Modal, Button } from "react-bootstrap";
import AddForm from "./AddForm";
import Alert from "react-bootstrap/Alert";
import Pagination from "./Pagination";

function EmployeeList() {
  const { sortedEmployees } = useContext(EmployeeContext);
  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(2);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();
    return () => {
      handleShowAlert();
    };
  }, [sortedEmployees]);

  const indexOflastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOflastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOflastEmployee
  );
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);
  console.log(totalPagesNum);
  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage<b> Employees</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">
                <span className="material-symbols-outlined">add</span>
              </i>
              <span>
                <strong>Add New Employees</strong>
              </span>
            </Button>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success">
        Employee List Updated Successfully!
      </Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <Employee employee={employee} />
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={sortedEmployees}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeList;
