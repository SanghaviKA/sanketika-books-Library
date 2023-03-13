import axios from "axios";

//Book Apis
const booksApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/library/books/",
});

export const registerBook = (bookData) => {
  return booksApi.post("/register?tableName=books", bookData);
};

export const fetchBooks = () => {
  return booksApi.get(`${BaseUrl}/read/books`);
};

//Students Apis
const studnetsApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/library/students/",
});

export const registerStudent = (studentData) => {
  return studnetsApi.post("register?tableName=students", studentData);
};

const BaseUrl = "http://localhost:4000/api/v1/library";

export const fetchStudents = () => {
  return axios.get(`${BaseUrl}/read/students`);
};

//BookAssign Apis

export const searchBookAPI = (searchQuery) => {
  const values = { query: searchQuery };

  return axios.post(
    "http://localhost:4000/api/v1/library/books/search",
    values
  );
};

export const assignBookAPI = (tableName, values) => {
  return axios.post(
    `http://localhost:4000/api/v1/library/books/assign?tableName=${tableName}`,
    values
  );
};

const Baseurl = "http://localhost:4000/api/v1/library";

export const fetchBookAssign = () => {
  return axios.get(`${Baseurl}/read/bookassign`);
};
