import { Link } from "react-router-dom";

type Props = {
  workout: Workout;
};

export const WorkoutCard = ({ workout }: Props) => {
  return (
    <Link
      to={{
        pathname: `/workout/${workout.id}`,
        state: { workout },
      }}
    >
      <div className="workout-card">{workout.workoutName}</div>
    </Link>
  );
};
