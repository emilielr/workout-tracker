import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import "../components/DetailedWorkoutForm.scss";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../utils/date";

type LocationState = {
  workout: Workout;
};

export const WorkoutDetail = () => {
  const { state } = useLocation<LocationState>();
  const workout = state.workout;

  return (
    <div className="detail-container">
      <Button component={Link} to="/workouts" variant="outlined">
        Tilbake
      </Button>
      <h1>{workout.workoutName}</h1>
      <h2>{formatDate(workout.date)}</h2>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Øvelse</TableCell>
              <TableCell align="right" className="set1">
                Sett 1
              </TableCell>
              <TableCell align="right" className="set2">
                Sett 2
              </TableCell>
              <TableCell align="right" className="set3">
                Sett 3
              </TableCell>
              <TableCell align="right" className="set4">
                Sett 4
              </TableCell>
              <TableCell align="right" className="set5">
                Sett 5
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workout.exercises.map((exercise: Exercise2, index: number) => {
              const allSets = [
                exercise.set1,
                exercise.set2,
                exercise.set3,
                exercise.set4,
                exercise.set5,
              ];

              return (
                <TableRow key={index}>
                  <TableCell>{exercise.name}</TableCell>
                  {allSets.map((set: Sett, index: number) => {
                    return (
                      <TableCell key={index}>
                        {set.kg === "" && set.reps === "" ? (
                          ""
                        ) : (
                          <div>
                            {set.kg} kg / {set.reps}
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
