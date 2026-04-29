import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from "./CourseForm";
import ResultPage from "./ResultPage";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseForm />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;