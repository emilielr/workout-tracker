import { useEffect, useState } from "react";
import { db } from "../firebase";
import { usePrevious } from "../utils/comparison";
import { WorkoutCard } from "./WorkoutCard";

export const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const prevWorkouts = usePrevious(workouts);

  useEffect(() => {
    if (prevWorkouts === workouts) {
      db.collection("workouts")
        .get()
        .then((querySnapshot) => {
          let temp: Workout[] = [];
          querySnapshot.forEach((doc) => {
            temp.push({
              id: doc.id,
              workoutName: doc.data().workoutName,
              date: doc.data().date.toDate(),
              exercises: doc.data().exercises,
            });
          });
          temp
            .sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
            .reverse();
          setWorkouts(temp);
        });
    }
  }, [prevWorkouts, workouts]);

  return (
    <div className="workout-list">
      {workouts.map((workout: Workout, index: number) => {
        return <WorkoutCard workout={workout} key={index} />;
      })}
    </div>
  );
};
