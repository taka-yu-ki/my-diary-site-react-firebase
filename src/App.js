import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import CalendarFunction from "./components/CalendarFunction";
import ToDoFunction from "./components/TodoFunction";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Header />
      {user && user.uid === auth.currentUser.uid ? (
        <>
          <div>
            <CalendarFunction />
          </div>
          <div>
            <ToDoFunction />
          </div>
        </>
      ) : (
        <>
          <div>ログイン認証してみよう</div>
          <SignIn />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
