import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./studentRegister.css";
import { fetchStudents } from "./apis";
import { NotificationService } from "./notificationService.js";
const notification = new NotificationService();


const StudentDetails = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
        notification.errorNotification("failed to fetch the details")
      });
  }, []);

  return (
    <div>
    
      <h2>List of Students Registered:</h2>
      <Toaster/>
      <table class="student-registration-table">
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
