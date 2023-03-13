const { config } = require("./configs/config");

const Pool = require("pg").Pool;
const _ = require("lodash-uuid");

const pool = new Pool({
  user: process.env.postgres_user || config.postgres.user,
  host: config.postgres.host,
  database: process.env.student_db || config.postgres.db,
  password: process.env.postgres_password,
  port: config.postgres.port,
});

// const readRecord = `SELECT * FROM $tableName;`;

const readStudentsRecord =`Select * from students;`;

const readBooksRecord = `select * from books;`;

const readBookAssignRecord = `select * from bookassign;`;





const updateRecord = `UPDATE $tableName SET $values WHERE id=$id;`;
const deleteRecord = `DELETE FROM $tableName WHERE id=$id;`;
const addStudentsRecord = `INSERT INTO $tableName (studentname, studentid,branch,semester) VALUES ($1, $2, $3, $4);`;
const addBooksRecord = `INSERT INTO $tableName (bookname,bookid,branch,semester) VALUES ($1,${_.uuid()},$3,$4);`;
const addBookAssignRecord = ` INSERT INTO $tableName(book_id,student_id,action,no_of_days,return_date,no_days_extend,assign_date)VALUES ($1,$2,$3,$4,$5,$6,$7);`;

const insertStudentRecord = () => {
  return `
  INSERT INTO ${config.postgres.tables.student_table} (studentname, studentid, branch, semester)
  SELECT $1, $2, $3, $4
  WHERE NOT EXISTS (
    SELECT 1 FROM  ${config.postgres.tables.student_table} WHERE studentid = $2
  )
`;
};

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

const addBooks = () => {
    return `INSERT INTO ${config.postgres.tables.books_table} (bookname, book_id,branch,semester, status) VALUES ($1, $2, $3,$4,$5)`;
  };

const updateBook = (book_id) => {
  return `update books set status = 'available' where book_id = '${book_id}';`;
};

const updateBookReturn = () => {
  return `UPDATE ${config.postgres.tables.assign_table} SET action = $1, return_date = $2 WHERE book_id = $3 AND student_id = $4;`;
};

const updateBookRenewal = () => {
  return `UPDATE ${config.postgres.tables.assign_table} SET action = $1, no_days_extend = $2 WHERE book_id = $3 AND student_id = $4;`;
};

const updateBookAssign = () => {
  return `INSERT INTO ${config.postgres.tables.assign_table} (student_id, action, number_of_days, assign_date, book_id) VALUES ($1, $2, $3, $4,$5)`;
};

const bookExists = (student_id, book_id) => {
  return `select * from bookassign where student_id = '${student_id}' and book_id = '${book_id}';`;
};

module.exports = {
  // readRecord,
  readBooksRecord,
  readStudentsRecord,
  readBookAssignRecord,
  updateRecord,
  deleteRecord,
  addStudentsRecord,
  addBooksRecord,
  addBookAssignRecord,
  getSearchQuery,
  getStudent,
  getReturnValidation,
  getBookAssignment,
  addBooks,
  insertStudentRecord,
  pool,
  updateBook,
  updateBookReturn,
  updateBookRenewal,
  updateBookAssign,
  bookExists,
};
