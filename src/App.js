import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignOut from "./components/SignOut";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? (
        <div>
          <SignOut />
        </div>
      ) : (
        <>
          <div>ログイン認証してみよう</div>
          <SignIn />
        </>
      )}
    </div>
  );
};

export default App;
