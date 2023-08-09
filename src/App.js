import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import CalendarFunction from "./components/CalendarFunction";
import ToDoFunction from "./components/TodoFunction";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Header />
      {user && user.uid === auth.currentUser.uid ? (
        <>
          <CalendarFunction />
          <ToDoFunction />
        </>
      ) : (
        <>
          <Home />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
