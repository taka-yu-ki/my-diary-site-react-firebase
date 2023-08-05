import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const TodoFunction = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const userId = auth.currentUser.uid;
  const collectionRef = collection(db, `users/${userId}/todoList`);

  // リアルタイムでデータを取得してtodoListに格納する処理
  useEffect(() => {
    const userId = auth.currentUser.uid;
    const collectionRef = collection(db, `users/${userId}/todoList`);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      data.sort((a, b) => b.createdAt - a.createdAt);

      setTodoList(data);
    });

    return () => unsubscribe();
  }, []);

  // todoを新規作成する処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 空白のみのtodoを弾く処理
    const trimmedTodo = todo.trim();
    if (trimmedTodo.length === 0) return;

    const data = {
      todo: trimmedTodo,
      isComplete: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(collectionRef), data);
    setTodo("");
  };

  // todoを更新する処理
  const handleUpdate = async (e) => {
    e.preventDefault();

    // 空白のみのtodoを弾く処理
    const trimmedTodo = editTodo.trim();
    if (trimmedTodo.length === 0) {
      return alert("文字を入力してください");
    }

    const itemRef = doc(collectionRef, editItemId);
    const data = {
      todo: trimmedTodo,
    };

    await setDoc(itemRef, data, { merge: true });
    setEditTodo("");
    setEditItemId(null);
  };

  // 編集モードに変更する処理
  const handleEdit = (item) => {
    setEditItemId(item.id);
    setEditTodo(item.todo);
  };

  // 特定のtodoを削除する処理
  const handleDelete = async (item) => {
    const itemRef = doc(collectionRef, item.id);
    await deleteDoc(itemRef);
  };

  // checkboxの状態をデータに反映させる処理
  const handleCheckboxChange = async (item) => {
    const updatedItem = { ...item, isComplete: !item.isComplete };
    await setDoc(doc(collectionRef, item.id), updatedItem);
  };

  // 作成したtodoを並べて表示させる処理
  const renderTodoItem = (item) => {
    const isEditing = editItemId === item.id;

    return (
      <div
        className={`task_list ${item.isComplete ? "completed" : ""}`}
        key={item.id}
      >
        <li>
          <input
            type="checkbox"
            checked={item.isComplete}
            onChange={() => handleCheckboxChange(item)}
          />
          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                required
              />
              <button type="submit">更新</button>
              <button type="button" onClick={() => setEditItemId(null)}>
                キャンセル
              </button>
            </form>
          ) : (
            <>
              <p className="task_display">{item.todo}</p>
              <p>{`作成日: ${item.createdAt?.toDate().toLocaleString()}`}</p>
              <button type="button" onClick={() => handleEdit(item)}>
                編集
              </button>
            </>
          )}
          <button type="button" onClick={() => handleDelete(item)}>
            削除
          </button>
        </li>
      </div>
    );
  };

  return (
    <>
      <h3>Todo</h3>
      <div className="todo">
        <div className="task_form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="task_value"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Todoを追加"
              required
            />
            <button type="submit" className="task_submit">
              保存
            </button>
          </form>
        </div>

        <div className="task_lists">
          <p>現在のタスク</p>
          <ul className="task_list_container">
            {todoList.length === 0 ? (
              <p>現在のタスクはありません</p>
            ) : (
              todoList.map((item) => renderTodoItem(item))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoFunction;
