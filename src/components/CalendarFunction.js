import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase";

const CalendarFunction = () => {
  const [value, onChange] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const navigate = useNavigate();

  // レンダリングする際に、データを取得し、diaryDataに格納する処理。
  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/diaries`)
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });
      setDiaryData(data);
    };
    fetchData();
  }, []);

  // 日付ボタンを押した時に、ページ移動する処理
  const handleButtonClick = async (date) => {
    const id = date.toISOString().slice(0, 10).replace(/-/g, "");
    const selectedDiary = diaryData.find((diary) => diary.id === id);

    if (selectedDiary) {
      navigate("/DiaryPage", {
        state: { diary: selectedDiary.data },
      });
    } else {
      navigate("/CreateDiary", { state: { date: date } });
    }
  };

  // 日記が存在する場合にその日記のタイトルを表示する処理
  const checkDiary = ({ date, view }) => {
    const day = String(date.getDate() - 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const id = `${year}${month}${day}`;
    const selectedDiary = diaryData.find((diary) => diary.id === id);

    if (view === "month" && selectedDiary) {
      return selectedDiary.data.title;
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2>カレンダー日記</h2>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={handleButtonClick}
        tileContent={checkDiary}
      />
    </div>
  );
};

export default CalendarFunction;
