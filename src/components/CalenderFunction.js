import React, { useState } from "react";
import Calender from "react-calendar";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const CalenderFunction = () => {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  const handleButtonClick = async (date) => {
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const userId = auth.currentUser.uid;
    const ref = doc(db, `users/${userId}/diaries/${formattedDate}`);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      navigate("/DiaryPage", { state: { diary: docSnap.data() } });
    } else {
      navigate("/CreateDiary", { state: { date: date } });
    }
  };
  return (
    <div>
      <h2>カレンダー日記</h2>
      <Calender
        onChange={onChange}
        value={value}
        onClickDay={handleButtonClick}
      />
    </div>
  );
};

export default CalenderFunction;
