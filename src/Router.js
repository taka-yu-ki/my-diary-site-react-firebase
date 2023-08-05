import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateDiary from "./page/CreateDiary";
import DiaryPage from "./page/DiaryPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page/CreateDiary" element={<CreateDiary />} />
        <Route path="/page/DiaryPage" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
