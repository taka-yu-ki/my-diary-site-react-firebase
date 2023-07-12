import React, { useState } from "react";
import "./App.css";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const date = useLocation().state.date;
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const ref = doc(db, `users/${userId}/diaries/${formattedDate}`);
    const data = {
      date: date,
      title: title,
      text: text,
    };

    try {
      await setDoc(ref, data);
      alert("日記が追加されました！");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="diary-form" onSubmit={handleSubmit}>
      <h2>日記作成</h2>
      <div className="form-group">
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">内容</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">保存</button>
    </form>
  );
};

export default CreateDiary;
