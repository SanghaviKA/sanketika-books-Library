import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedBook.css";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/library/read?tableName=students")
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>List of Students Registered:</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Branch</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.bookid}>
              <td>{student.studentname}</td>
              <td>{student.studentid}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
