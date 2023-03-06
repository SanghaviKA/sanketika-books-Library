const { DatabaseError } = require("pg");
const pool = require("../../db");
const queries = require("./queries");
const _ = require("lodash");

const ReadRecord = (req, res) => {
  const tableName = req.query.tableName;
  let queryText = queries.readRecord.replace("$tableName", tableName);

  queryText = queryText.replace("$id", req.query.id);

  pool.query(queryText, (error, results) => {
    const noDataNotFound = !results.rows.length;
    if (noDataNotFound) {
      res.send("date not exist in the database");
    } else {
      res.status(200).send(results.rows);
      console.log(results);
    }
  });
};

const AddStudentsRecord = (req, res) => {
  const tableName = req.query.tableName;
  const newRecord = req.body;
  let queryText = `
    INSERT INTO ${tableName} (studentname, studentid, branch, semester)
    SELECT $1, $2, $3, $4
    WHERE NOT EXISTS (
      SELECT 1 FROM ${tableName} WHERE studentid = $2
    )
  `;
  const values = [
    newRecord.studentname,
    newRecord.studentid,
    newRecord.branch,
    newRecord.semester,
  ];

  pool.query(queryText, values, (error, results) => {
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
  const tableName = req.query.tableName;
  const newRecord = req.body;
  const _ = require("lodash-uuid");
  let queryText = `INSERT INTO ${tableName} (bookname, book_id,branch,semester, status) VALUES ($1, $2, $3,$4,$5)`;
  const values = [
    newRecord.bookname,
    _.uuid(),
    newRecord.branch,
    newRecord.semester,
    "available",
  ];

  pool.query(queryText, values, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error adding record");
    } else {
      res.send("Record added successfully");
    }
  });
};

const searchBook = (req, res) => {
  const key = req.body.query;
  if (key.length >= 3) {
    const query = queries.getSearchQuery(key);
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error adding record");
      } else {
        res.status(200).send(results.rows);
      }
    });
  } else {
    res.status(500).send("minimum of 3 chars are required");
  }
};

const AddBookAssignRecord = (req, res) => {
  const tableName = req.query.tableName;
  const newRecord = req.body;

  let queryText;
  let values;
  let studentQuery = queries.getStudent(newRecord.student_id);

  let updateBooksQuery;

  const BookRenewalStatusQuery = queries.getReturnValidation(
    newRecord.student_id,
    newRecord.book_id
  );

  if (newRecord.action === "return") {
    updateBooksQuery = `update books set status = 'available' where book_id = '${newRecord.book_id}';`;
    queryText = `UPDATE ${tableName} SET action = $1, return_date = $2 WHERE book_id = $3 AND student_id = $4;`;
    values = [
      newRecord.action,
      newRecord.return_date,
      newRecord.book_id,
      newRecord.student_id,
    ];
  } else if (newRecord.action === "renewal") {
    updateBooksQuery = `update books set status = 'available' where book_id = '${newRecord.book_id}';`;
    queryText = `UPDATE ${tableName} SET action = $1, no_days_extend = $2 WHERE book_id = $3 AND student_id = $4;`;
    values = [
      newRecord.action,
      newRecord.no_days_extend,
      newRecord.book_id,
      newRecord.student_id,
    ];
  } else {
    updateBooksQuery = `update books set status = 'available' where book_id = '${newRecord.book_id}';`;
    queryText = `INSERT INTO ${tableName} (student_id, action, number_of_days, assign_date, book_id) VALUES ($1, $2, $3, $4,$5)`;
    values = [
      newRecord.student_id,
      newRecord.action,
      newRecord.number_of_days,
      newRecord.assign_date,
      newRecord.book_id,
    ];
  }
  pool.query(studentQuery, (error, result) => {
    if (error) {
      res.status(500).send("Error in fetching students details");
    } else {
      if (result.rows.length > 0) {
        if (newRecord.action !== "bookassign") {
          pool.query(BookRenewalStatusQuery, (err, suc) => {
            if (err) {
              res
                .status(500)
                .send("Error in fetching the book and students details");
            } else {
              if (suc.rows.length > 0) {
                pool.query(queryText, values, (error, results) => {
                  if (error) {
                    res.status(500).send("Error adding record");
                  } else {
                    if (newRecord.action === "bookassign") {
                      const query = `select * from bookassign where student_id = '${newRecord.student_id}' and book_id = '${newRecord.book_id}';`;
                      pool.query(query, (err, response) => {
                        if (response.rows.length > 0) {
                          res
                            .status(500)
                            .send(
                              "The book is already assigned to the student"
                            );
                        } else {
                          pool.query(updateBooksQuery, [], (error, results) => {
                            if (error) {
                              res.status(500).send("Error adding record");
                            } else {
                              res.status(200).send("Record added successfully");
                            }
                          });
                        }
                      });
                    } else {
                      res.status(200).send("Book status updated");
                    }
                  }
                });
              } else {
                res
                  .status(500)
                  .send(
                    "Book is not assigned to the student to perform renewal or return"
                  );
              }
            }
          });
        } else {
          const query = `select * from bookassign where student_id = '${newRecord.student_id}' and book_id = '${newRecord.book_id}';`;
          pool.query(query, (err, response) => {
            if (response.rows.length > 0) {
              res
                .status(500)
                .send("The book is already assigned to the student");
            } else {
              pool.query(queryText, values, (error, results) => {
                if (error) {
                  console.log(error);
                  res.status(500).send("Error adding record");
                } else {
                  res.status(200).send("Record added successfully");
                }
              });
            }
          });
        }
      } else {
        res.status(500).send("Student is not registred in the system");
      }
    }
  });
};

const UpdateRecord = (req, res) => {
  const tableName = req.query.tableName;
  const id = req.query.id;
  const updateValues = req.body;

  let queryText = queries.updateRecord.replace("$tableName", tableName);
  queryText = queryText.replace("$id", id);

  console.log("updatedValues" + JSON.stringify(updateValues));
  const setValues = columns
    .map((col, index) => `${columns}=$${index + 1}`)
    .join(",");
  const queryValues = [...values];

  queryText = queryText.replace("$values", setValues);

  console.log(queryText);

  pool.query(queryText, queryValues, (error, results) => {
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
  let queryText = queries.deleteRecord.replace("$tableName", tableName);

  queryText = queryText.replace("$id", id);

  pool.query(queryText, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting record");
    } else {
      res.send("Record deleted successfully");
    }
  });
};

module.exports = {
  ReadRecord,
  searchBook,
  UpdateRecord,
  DeleteRecord,
  AddStudentsRecord,
  AddBooksRecord,
  AddBookAssignRecord,
};
