import React from "react";
import "./App.css";
import { useLocation } from "react-router-dom";

const DiaryPage = () => {
  const diary = useLocation().state.diary;
  return (
    <div className="diary">
      <h2 className="diary-title">{diary.title}</h2>
      <p className="diary-text">{diary.text}</p>
    </div>
  );
};

export default DiaryPage;
