import { Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

type LocationState = {
  workout: Workout;
};

export const WorkoutDetail = () => {
  const { state } = useLocation<LocationState>();
  const workout = state.workout;

  return (
    <div className="detail-container">
      <Button component={Link} to="/" variant="outlined">
        Tilbake
      </Button>
      <h1>{workout.workoutName}</h1>
      <h2>
        {workout.exercises.map((exercise: Exercise, index: number) => {
          return (
            <div className="exercise" key={index}>
              <p>{exercise.name}</p>
              <p>
                {exercise.reps}x{exercise.sets} / {exercise.kg} kg
              </p>
            </div>
          );
        })}
      </h2>
    </div>
  );
};
