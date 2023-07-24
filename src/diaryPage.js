import React from "react";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";

const DiaryPage = () => {
  const navigate = useNavigate();
  const diary = useLocation().state.diary;
  const date = useLocation().state.date;
  return (
    <div className="diary">
      <h2 className="diary-title">{diary.title}</h2>
      <p className="diary-text">{diary.text}</p>
      <div className="button-group">
        <button
          className="button edit"
          onClick={() =>
            navigate("/CreateDiary", { state: { date: date, diary: diary } })
          }
        >
          編集
        </button>
        <button
          className="button back"
          type="button"
          onClick={() => navigate("/")}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default DiaryPage;
