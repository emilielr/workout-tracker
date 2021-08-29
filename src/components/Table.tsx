import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import { simpleFormatDate } from "../utils/date";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  exercise: string;
};

export const TableComponent = ({ exercise }: Props) => {
  const [data, setData] = useState<Workout[]>([]);

  const getWorkoutsWithExercise = async (e: string) => {
    await db
      .collection("workouts")
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.data().exercises.forEach((exercise: Exercise) => {
            if (exercise.name.toLowerCase() === e.toLowerCase()) {
              setData((data) => [
                ...data,
                {
                  id: doc.id,
                  workoutName: doc.data().workoutName,
                  date: doc.data().date.toDate(),
                  exercises: doc.data().exercises,
                },
              ]);
            }
          });
        });
      });
  };

  useEffect(() => {
    setData([]);
    if (exercise !== "") {
      getWorkoutsWithExercise(exercise);
    }
  }, [exercise]);

  return (
    <div>
      <h2>Økter med {exercise.toLowerCase()}:</h2>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Dato</TableCell>
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
            {data.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    {simpleFormatDate(data.date)}
                    <br />
                    {data.workoutName}
                  </TableCell>

                  {data.exercises
                    .filter(
                      (e) => e.name.toLowerCase() === exercise.toLowerCase()
                    )
                    .map((e) => {
                      const allSets = [e.set1, e.set2, e.set3, e.set4, e.set5];

                      return allSets.map((set: Sett, index: number) => {
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
                      });
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
