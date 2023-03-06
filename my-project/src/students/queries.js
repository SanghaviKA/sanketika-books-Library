const _ = require("lodash-uuid");

const readRecord = `SELECT * FROM $tableName;`;
const updateRecord = `UPDATE $tableName SET $values WHERE id=$id;`;
const deleteRecord = `DELETE FROM $tableName WHERE id=$id;`;
const addStudentsRecord = `INSERT INTO $tableName (studentname, studentid,branch,semester) VALUES ($1, $2, $3, $4);`;
const addBooksRecord = `INSERT INTO $tableName (bookname,bookid,branch,semester) VALUES ($1,${_.uuid()},$3,$4);`;

const addBookAssignRecord = ` INSERT INTO $tableName(book_id,student_id,action,no_of_days,return_date,no_days_extend,assign_date)VALUES ($1,$2,$3,$4,$5,$6,$7);`;

const getSearchQuery = (search_word) => {
  return `select * from books where status = 'available' and bookname ilike '%${search_word}%';`;
};

const getStudent = (entered_studentId) => {
  return `SELECT * from students where studentid =${entered_studentId}`;
};

const getReturnValidation = (entered_studentId, entered_bookid) => {
  return `SELECT * FROM bookassign where student_id = ${entered_studentId} and book_id = '${entered_bookid}' and action ='bookassign';`;
};

const getBookAssignment = (entered_studentId, entered_bookid) => {
  return `SELECT * FROM bookassign WHERE student_id = ${entered_studentId} AND book_id = '${entered_bookid}' AND action = 'bookassign';`;
};

module.exports = {
  readRecord,
  updateRecord,
  deleteRecord,
  addStudentsRecord,
  addBooksRecord,
  addBookAssignRecord,
  getSearchQuery,
  getStudent,
  getReturnValidation,
  getBookAssignment,
};
