import React, { useState, useEffect } from "react";
import "./AssignedBook.css";
import { fetchBookAssign } from "./apis";
import { NotificationService } from "./notificationService.js";
const notification = new NotificationService();

const BookDetails = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBookAssign()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        notification.errorNotification("failed to fetch the details")
      });
  }, []);

  return (
    <div>
      <h2>Library books</h2>
      <table className="book-assign-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Action</th>
            <th>Number of Days</th>
            <th>Return Date</th>
            <th>Days Extend</th>
            <th>Assign Date</th>
            <th>Book ID</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td>{book.student_id}</td>
              <td>{book.action}</td>
              <td>{book.number_of_days}</td>
              <td>
                {book.return_date
                  ? new Date(book.return_date).toLocaleDateString()
                  : ""}
              </td>
              <td>{book.no_days_extend || ""}</td>
              <td>
                {book.return_date || book.no_days_extend
                  ? ""
                  : new Date(book.assign_date).toLocaleDateString()}
              </td>
              <td>{book.book_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
