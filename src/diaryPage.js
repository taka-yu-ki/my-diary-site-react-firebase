import React from "react";
import "./App.css";

const diaryPage = () => {
  return (
    <form className="diary-form">
      <h2>日記作成</h2>
      <div className="form-group">
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" className="title" required />
      </div>
      <div className="form-group">
        <label htmlFor="content">内容</label>
        <textarea id="content" name="content" rows="5" required></textarea>
      </div>
      <button type="submit">保存</button>
    </form>
  );
};

export default diaryPage;
