import React, { useState } from "react";

import { Layout, Form } from "antd";

import BookRegistration from "./BookRegistration";
import StudentRegistration from "./StudentRegistration";
import Actions from "./Actions";
import logo from "./Sanketika-logo.jpeg";

const { Content } = Layout;

const BooksLibrary = () => {
  const [selectedRegistration, setSelectedRegistration] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const handleRegistrationChange = (event) => {
    setSelectedRegistration(event.target.value);
    setSelectedAction("");
  };
  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
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
                {/* <option value="renewal">Renewal</option> */}
                {/* <option value="return">Return</option> */}
              </select>
            </div>
          </div>
          {selectedAction === "assign-book" && <Actions />}
          {selectedRegistration === "book-registration" &&
            selectedAction !== "assign-book" && <BookRegistration />}
          {selectedRegistration === "student-registration" &&
            selectedAction !== "assign-book" && <StudentRegistration />}
        </Form>
      </Content>
    </Layout>
  );
};

export default BooksLibrary;

// In this form when  selectedAction === "assign-book"<Action/> it should navigate to /book-registration.
