import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from "./CourseForm";
import ResultPage from "./ResultPage";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <CourseForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/result" 
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;