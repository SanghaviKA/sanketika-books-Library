import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedBook.css";

const BookDetails = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/library/read?tableName=bookassign")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Library books</h2>
      <table className="book-details-table">
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
