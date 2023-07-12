import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateDiary from "./CreateDiary";
import DiaryPage from "./DiaryPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CreateDiary" element={<CreateDiary />} />
        <Route path="/DiaryPage" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
