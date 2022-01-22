import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/login" exact element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
