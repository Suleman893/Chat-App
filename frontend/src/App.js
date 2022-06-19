import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import Signup from "./Components/Account/Signup";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route path="/chats" component={ChatPage} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
