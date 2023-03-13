import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BooksLibrary from "./components/BooksLibrary";
import BookRegistration from "./components/BookRegistration";
import StudentRegistration from "./components/StudentRegistration";
import Actions from "./components/Actions";
import BookDetails from "./components/BookDetails";
import StudentDetails from "./components/StudentDetails";
import AssignBook from "./components/AssignedBook";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  return (
    <Router>
      <div>
        <>
          <Navbar bg="primary" variant="dark" className="navbar">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>

              <Nav className="mr-auto">
                <NavDropdown title="View" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/book-details">
                    View Books
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student-details">
                    View Students
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/book-assign">
                    View Book Assign
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              {/* <Nav className="mr-auto">
                <Navbar.Brand href="">View</Navbar.Brand>
              </Nav> */}
            </Container>
          </Navbar>
        </>
      </div>
      <Toaster />
      <div>
        <nav>
          <Routes>
            <Route path="/" element={<BooksLibrary />} />
            <Route path="/book-registration" element={<BookRegistration />} />
            <Route
              path="/student-registration"
              element={<StudentRegistration />}
            />
            <Route path="/Action" element={<Actions />} />
            <Route path="/book-details" element={<BookDetails />} />
            <Route path="/student-details" element={<StudentDetails />} />
            <Route path="/book-assign" element={<AssignBook />} />
          </Routes>
        </nav>
      </div>
    </Router>
  );
}

export default App;
