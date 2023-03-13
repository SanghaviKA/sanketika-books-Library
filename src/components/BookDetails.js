import React, { useState, useEffect } from "react";
import "./bookRegister.css";
import { fetchBooks } from "./apis";
import { NotificationService } from "./notificationService.js";
const notification = new NotificationService();

const BookDetails = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
        notification.errorNotification("failed to show the details");
      });
  }, []);

  return (
    <div>
      <h2>List of books Registered:</h2>
      <table class="book-registration-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Book ID</th>
            <th>Branch</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookid}>
              <td>{book.bookname}</td>
              <td>{book.book_id}</td>
              <td>{book.branch}</td>
              <td>{book.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
