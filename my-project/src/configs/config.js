const config = {
  postgres: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    db: "students",
    password: "",
    tables: {
      student_table: "students",
      books_table: "books",
      assign_table: "bookassign",
    },
  },
  api_paths: {
    base_path: "/api/v1/library",

    readbooks:"/read/books",
    readstudents:"/read/students",
    readassign:"/read/bookassign",

    // read: "/read",
    book_register: "/books/register",
    student_register: "/students/register",
    book_assign: "/books/assign",
    book_search: "/books/search",
  },

  port: 4000,
};

module.exports = { config };
