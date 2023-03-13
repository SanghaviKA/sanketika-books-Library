const { DatabaseError } = require("pg");
const db = require("../db");
const _ = require("lodash");
const { result } = require("lodash");
const { message } = require("antd");

const readBooksRecord = (req, res) => {
  let queryText = db.readBooksRecord;
  db.pool.query(queryText, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Server error" });
    }
    const noDataNotFound = !results.rows.length;
    if (noDataNotFound) {
      res.status(404).json({ error: "Data not found in database" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const readStudentsRecord = (req, res) => {
  let queryText = db.readStudentsRecord;

  db.pool.query(queryText, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Server error" });
    }
    const noDataNotFound = !results.rows.length;
    if (noDataNotFound) {
      res.status(404).json({ error: "Data not found in database" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
const readBookAssignRecord = (req, res) => {
  let queryText = db.readBookAssignRecord;
  db.pool.query(queryText, (error, results) => {
    const noDataNotFound = !results.rows.length;
    if (noDataNotFound) {
      res.status(404).json({ error: "Data not found in database" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const AddStudentsRecord = (req, res) => {
  const newRecord = req.body;
  let studentsquery = db.insertStudentRecord();

  const values = [
    newRecord.studentname,
    newRecord.studentid,
    newRecord.branch,
    newRecord.semester,
  ];

  db.pool.query(studentsquery, values, (error, results) => {
    if (error) {
      res.status(500).send("Error adding record");
    } else {
      if (results.rowCount === 0) {
        res.status(200).send({
          message: "Record already exists with this student id.",
        });
      } else {
        res.send("Record added successfully");
      }
    }
  });
};

const AddBooksRecord = (req, res) => {
  const newRecord = req.body;
  const _ = require("lodash-uuid");

  let booksquery = db.addBooks();

  const values = [
    newRecord.bookname,
    _.uuid(),
    newRecord.branch,
    newRecord.semester,
    "available",
  ];

  db.pool.query(booksquery, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error adding record" });
    } else {
      res.status(201).json({ message: "Record added successfully" });
    }
  });
};

const searchBook = (req, res) => {
  const key = req.body.query;

  if (key.length >= 3) {
    const query = db.getSearchQuery(key);
    db.pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error adding record");
      } else {
        res.status(200).json(results.rows);
      }
    });
  } else {
    res.status(500).json({ error: "minimum of 3 chars are required" });
  }
};

const getBookAssignedStatus = async (studentId, bookId) => {
  const query = db.getReturnValidation(studentId, bookId);
  const { rows } = await db.pool.query(query);
  return rows.length > 0;
};
const isBookAlreadyAssigned = async (studentId, bookId) => {
  const query = db.bookExists(studentId, bookId);
  const { rows } = await db.pool.query(query);
  return rows.length > 0;
};

const AddBookAssignRecord = async (req, res) => {
  const newRecord = req.body;
  const { student_id, book_id, action } = newRecord;

  try {
    const [
      {
        rows: [student],
      },
      bookAssigned,
    ] = await Promise.all([
      db.pool.query(db.getStudent(student_id)),
      getBookAssignedStatus(student_id, book_id),
    ]);

    if (!student) {
      return res.status(500).send("Student is not registered in the system");
    }

    if (action === "return" || action === "renewal") {
      if (!bookAssigned) {
        return res
          .status(500)
          .send(
            "Book is not assigned to the student to perform renewal or return"
          );
      }
    } else if (action === "bookassign") {
      const bookAlreadyAssigned = await isBookAlreadyAssigned(
        student_id,
        book_id
      );
      if (bookAlreadyAssigned) {
        return res
          .status(500)
          .send("The book is already assigned to the student");
      }
    }
    const queryText = {
      return: db.updateBookReturn(),
      renewal: db.updateBookRenewal(),
      bookassign: db.updateBookAssign(),
    }[action];

    const values = {
      return: [action, newRecord.return_date, book_id, student_id],
      renewal: [action, newRecord.no_days_extend, book_id, student_id],
      bookassign: [
        student_id,
        action,
        newRecord.number_of_days,
        newRecord.assign_date,
        book_id,
      ],
    }[action];

    const updateBooksQuery = db.updateBook(book_id);

    await Promise.all([
      db.pool.query(queryText, values),
      db.pool.query(updateBooksQuery),
    ]);
    res.status(200).json({ success: "Record added successfully" });
  } catch (error) {
    res.status(500).send("Error adding record");
  }
};

const UpdateRecord = (req, res) => {
  const tableName = req.query.tableName;
  const id = req.query.id;
  const updateValues = req.body;

  let queryText = pool.updateRecord.replace("$tableName", tableName);
  queryText = queryText.replace("$id", id);
  const setValues = columns
    .map((col, index) => `${columns}=$${index + 1}`)
    .join(",");
  const queryValues = [...values];
  queryText = queryText.replace("$values", setValues);
  db.pool.query(queryText, queryValues, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating record");
    } else {
      res.status(200).send("Record updated successfully");
    }
  });
};

const DeleteRecord = (req, res) => {
  const tableName = req.query.tableName;
  const id = req.query.id;
  let queryText = pool.deleteRecord.replace("$tableName", tableName);
  queryText = queryText.replace("$id", id);
  db.pool.query(queryText, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting record");
    } else {
      res.send("Record deleted successfully");
    }
  });
};

module.exports = {
  // ReadRecord,
  searchBook,
  UpdateRecord,
  DeleteRecord,
  AddStudentsRecord,
  AddBooksRecord,
  AddBookAssignRecord,
  readBooksRecord,
  readStudentsRecord,
  readBookAssignRecord,
  readBooksRecord,
};
