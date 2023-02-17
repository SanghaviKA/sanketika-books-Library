
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BooksLibrary from "./components/BooksLibrary";
import BookRegistration from "./components/BookRegistration";
import StudentRegistration from "./components/StudentRegistration";
import Actions from "./components/Actions";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Routes>
            <Route path="/" element={<BooksLibrary />} />
            <Route path="/book-registration" element={<BookRegistration />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/Action"element={<Actions/>}/>
          </Routes>
        </nav>
      </div>
    </Router>
  );
}

export default App;

