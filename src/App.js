import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import V2WittyPage from "./V2Page/V2WittyPage/V2WittyPage"
import V2LoginPage from "./V2Page/V2LoginPage/V2LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<V2LoginPage/>}/>
          <Route path="/witty" exact element={<V2WittyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
