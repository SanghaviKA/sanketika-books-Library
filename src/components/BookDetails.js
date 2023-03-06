import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedBook.css";

const BookDetails = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/library/read?tableName=books")
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
      <h2>List of books Registered:</h2>
      <table>
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
