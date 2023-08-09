import React, { useEffect, useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";

const DiaryPage = () => {
  const [diary, setDiary] = useState();
  const [date, setDate] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  // ページ遷移元の情報をuseStateに格納する処理
  useEffect(() => {
    setDiary(location.state.diary);
    setDate(location.state.date);
  }, [location.state]);

  const day = String(date?.getDate()).padStart(2, "0");
  const month = String(date?.getMonth() + 1).padStart(2, "0");
  const year = date?.getFullYear();

  return (
    <div className="diary">
      <div className="diary-title-group">
        <h2 className="diary-title">{diary?.title}</h2>
        <h3>{`${year}/${month}/${day}`}</h3>
      </div>
      <p className="diary-text">{diary?.text}</p>
      <div className="button-group">
        <button
          className="button edit"
          onClick={() =>
            navigate("/page/CreateDiary", {
              state: { date: date, diary: diary },
            })
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
