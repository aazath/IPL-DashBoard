import './App.scss';
import React from 'react'
import './index.scss';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import {TeamPage} from "./pages/TeamPage";
import {MatchPage} from "./pages/MatchPage";

function App() {
  return (
      <div className="App">
          <Router>
                  <Routes>
                      <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
                      <Route path="/teams/:teamName" element={<TeamPage />} />
                  </Routes>
          </Router>
      </div>
  );
}

export default App;
