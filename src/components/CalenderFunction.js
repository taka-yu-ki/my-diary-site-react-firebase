import React, { useState } from "react";
import Calender from "react-calendar";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";

const CalenderFunction = () => {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

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
