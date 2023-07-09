import React, { useState } from "react";
import Calender from "react-calendar";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";

const CalenderFunction = () => {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  // const [diaries, setDiaries] = useState([]);

  // useEffect(() => {
  //   const diaryDate = collection(db, "diaries");
  //   getDocs(diaryDate).then((snapShot) => {
  //     setDiaries(snapShot.docs.map((doc) => ({ ...doc.data() })));
  //   });
  // });

  const handleButtonClick = () => {
    navigate("/diaryPage");
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
