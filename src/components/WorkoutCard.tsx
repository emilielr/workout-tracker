import { Link } from "react-router-dom";
import { simpleFormatDate } from "../utils/date";
import "./WorkoutCard.scss";

type Props = {
  workout: Workout;
};

export const WorkoutCard = ({ workout }: Props) => {
  const countExercises = () => {
    return Object.keys(workout.exercises).length;
  };

  return (
    <div className="card-container">
      <Link
        to={{
          pathname: `/workout/${workout.id}`,
          state: { workout },
        }}
      >
        <div className="card-content">
          <p className="name">{workout.workoutName}</p>
          <p className="exercises">{countExercises()} øvelse(r)</p>
          <p className="date">{simpleFormatDate(workout.date)}</p>
        </div>
      </Link>
    </div>
  );
};
