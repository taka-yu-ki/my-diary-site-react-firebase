import React, { useState } from "react";
import Calender from "react-calendar";
import "../Calendar.css";

const CalenderFunction = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <h2>カレンダー日記</h2>
      <Calender onChange={onChange} value={value} />
    </div>
  );
};

export default CalenderFunction;
