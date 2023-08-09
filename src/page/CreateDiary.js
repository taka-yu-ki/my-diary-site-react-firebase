import React, { useEffect, useState } from "react";
import "../App.css";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState();
  const [diary, setDiary] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ルート元から特定のデータを受け取り、変数に格納する処理
  useEffect(() => {
    setDate(location.state.date);
    setDiary(location.state.diary);
  }, [location.state]);

  const day = String(date?.getDate()).padStart(2, "0");
  const month = String(date?.getMonth() + 1).padStart(2, "0");
  const year = date?.getFullYear();
  const id = `${year}${month}${day}`;

  const userId = auth.currentUser?.uid;
  const ref = doc(db, `users/${userId}/diaries/${id}`);

  // 文字数制限の変数
  const maxTitleLength = 12;
  const maxTextLength = 500;

  // firebaseから既存のデータを取得し、編集モードに変更する処理
  useEffect(() => {
    const fetchDiaryData = async () => {
      const userId = auth.currentUser?.uid;
      const ref = doc(db, `users/${userId}/diaries/${id}`);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setIsEditMode(true);
        setTitle(diary.title);
        setText(diary.text);
      }
    };
    fetchDiaryData();
  }, [id, diary]);

  // 日記を追加・更新する処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date: date,
      title: title,
      text: text,
    };

    await setDoc(ref, data);
    alert(`日記が${isEditMode ? "更新" : "追加"}されました！`);
    setIsEditMode(false);
    navigate("/");
  };

  // 特定の日記を削除する処理
  const deletePost = () => {
    return deleteDoc(ref).then(async () => {
      alert("記事を削除しました");

      navigate("/");
    });
  };

  return (
    <form className="diary-form" onSubmit={handleSubmit}>
      <h2> {isEditMode ? "日記更新" : "日記作成"}</h2>
      <div className="form-group">
        <h3>{`${year}/${month}/${day}`}</h3>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={maxTitleLength}
          required
        />
        <span className="char-count">
          {`${title.length} / ${maxTitleLength}文字`}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="content">内容</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxTextLength}
          required
        ></textarea>
        <span className="char-count">
          {`${text.length} / ${maxTextLength}文字`}
        </span>
      </div>
      <div className="button-group">
        <button className="button submit" type="submit">
          {isEditMode ? "更新" : "保存"}
        </button>
        {isEditMode && (
          <button className="button delete" type="button" onClick={deletePost}>
            削除
          </button>
        )}

        <button
          className="button back"
          type="button"
          onClick={() => navigate("/")}
        >
          戻る
        </button>
      </div>
    </form>
  );
};

export default CreateDiary;
