import "./App.css";
import { MainView } from "./views/MainView";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WorkoutDetail } from "./views/WorkoutDetail";
import { ChartPage } from "./views/ChartPage";
import { TopBar } from "./components/TopBar";
import { WorkoutList } from "./components/WorkoutList";
import { DetailedWorkoutForm } from "./components/DetailedWorkoutForm";
import { SuggestionBank } from "./components/SuggestionBank";

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Route path="/newWorkout">
          <DetailedWorkoutForm />
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
        <Route path="/workouts">
          <WorkoutList />
        </Route>
        <Route path="/suggestions">
          <SuggestionBank />
        </Route>
      </div>
    </Router>
  );
}

export default App;
