import { useEffect, useState } from "react";
import { db } from "../firebase";
import { emptySet } from "./DetailedWorkoutForm";

const emptyExercise: Exercise = {
  name: "",
  set1: emptySet,
  set2: emptySet,
  set3: emptySet,
  set4: emptySet,
  set5: emptySet,
};

export const SuggestionBank = () => {
  const [data, setData] = useState<Exercise[]>([]);
  const getExercise = (e: string) => {
    db.collection("workouts")
      .get()
      .then((querySnapshot) => {
        let tempData: Exercise[] = [];
        let tempExercise: Exercise = emptyExercise;
        let latestWorkoutWithExericse = {};
        querySnapshot.forEach((doc) => {
          doc.data().exercises.forEach((exercise: Exercise) => {
            if (exercise.name.toLowerCase() === e.toLowerCase()) {
              console.log(exercise.name);
              const allSets = [
                exercise.set1,
                exercise.set2,
                exercise.set3,
                exercise.set4,
                exercise.set5,
              ];
              allSets.forEach((set: Sett) => {
                console.log(set);
              });
              latestWorkoutWithExericse = {
                id: doc.id,
                workoutName: doc.data().workoutName,
                date: doc.data().date.toDate(),
                exercises: doc.data().exercises,
              };
              console.log(latestWorkoutWithExericse);
              tempData.push(exercise);
            }
          });
        });
        setData(tempData);
      });
  };

  useEffect(() => {
    getExercise("markløft");
  }, []);
  return (
    <div>
      <h1>Forslagsbank</h1>
      <p>
        Forslagsbanken viser om du burde øke i en øvelse. Dette viser kun
        baseøvelser: knebøy, markløft, militærpress
      </p>
      {data.map((exercise: Exercise, index: number) => {
        return (
          <div key={index}>
            {exercise.name}
            {exercise.set1.kg}
          </div>
        );
      })}
    </div>
  );
};
