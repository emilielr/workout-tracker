import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import "../components/Form.scss";
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
      <Button component={Link} to="/allWorkouts" variant="outlined">
        Tilbake
      </Button>
      <h1>{workout.workoutName}</h1>
      <h2>{formatDate(workout.date)}</h2>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Øvelse</TableCell>
              <TableCell align="right" className="sets">
                Sett
              </TableCell>
              <TableCell align="right" className="reps">
                Reps
              </TableCell>
              <TableCell align="right" className="kg">
                Kg
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workout.exercises.map((exercise: Exercise, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell align="right">{exercise.sets}</TableCell>
                  <TableCell align="right">{exercise.reps}</TableCell>
                  <TableCell align="right">{exercise.kg}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
