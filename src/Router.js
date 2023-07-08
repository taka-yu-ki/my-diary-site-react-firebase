import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DiaryPage from "./diaryPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/diaryPage" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
