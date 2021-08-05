import React from "react";
import "./App.css";
import { WorkoutForm } from "./components/WorkoutForm";
import { MainView } from "./views/MainView";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WorkoutDetail } from "./views/WorkoutDetail";
import { ChartPage } from "./views/ChartPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/newWorkout">
          <WorkoutForm />
        </Route>
        <Route exact path="/">
          <MainView />
        </Route>
        <Route exact path="/workout/:id">
          <WorkoutDetail />
        </Route>
        <Route path="/chart">
          <ChartPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
