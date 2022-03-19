import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NewLoginPage from "./components/newLogin/NewLoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/newLogin" exact element={<NewLoginPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
