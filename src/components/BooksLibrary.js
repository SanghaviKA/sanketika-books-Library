import React, { useState } from "react";
import { Layout, Form } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "./Sanketika-logo.jpeg";

const { Content } = Layout;

const BooksLibrary = () => {
  const navigate = useNavigate();
  const [selectedRegistration, setSelectedRegistration] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const handleRegistrationChange = (event) => {
    setSelectedRegistration(event.target.value);
    setSelectedAction("");
    if (event.target.value === "book-registration") {
      navigate("/book-registration");
    } else if (event.target.value === "student-registration") {
      navigate("/student-registration");
    }
  };
  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    if (event.target.value === "assign-book") {
      navigate("/Action");
    } else if (event.target.value === "view-books") {
      navigate("/book-details");
    } else if (event.target.value === "view-students") {
      navigate("/student-details");
    } else if (event.target.value === "view-book-assigned") {
      navigate("/book-assign");
    }
  };

  return (
    <Layout>
      <div>
        <img
          src={logo}
          alt="Sanketika Books Library"
          style={{ height: "10rem", width: "15%", marginRight: "2rem" }}
        />
        <h1
          style={{
            fontSize: "2rem",
            marginTop: "0rem",
            marginBottom: "0rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Sanketika Books Library
        </h1>
      </div>

      <Content
        style={{
          minHeight: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form style={{ width: "50%", fontSize: "1rem", padding: "2rem" }}>
          <div
            className="form-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="form-group" style={{ marginRight: "2rem" }}>
              <label
                htmlFor="registration-select"
                style={{ fontSize: "1.5rem" }}
              >
                Registration:
              </label>
              <select
                id="registration-select"
                value={selectedRegistration}
                onChange={handleRegistrationChange}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              >
                <option value="">Select an option</option>
                <option value="book-registration">Book Registration</option>
                <option value="student-registration">
                  Student Registration
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="action-select" style={{ fontSize: "1.5rem" }}>
                Action:
              </label>
              <select
                id="action-select"
                value={selectedAction}
                onChange={handleActionChange}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              >
                <option value="">Select an option</option>
                <option value="assign-book">Assign Book</option>
                <option value="view-books">View Books</option>
                <option value="view-students">View Students</option>
                <option value="view-book-assigned">View Book assign</option>
              </select>
            </div>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};
export default BooksLibrary;
