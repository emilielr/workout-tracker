import { TablePagination } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { WorkoutCard } from "./WorkoutCard";
import firebase from "firebase";

export const WorkoutList = () => {
  const [prevPage, setPrevPage] =
    useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null>(
      null
    );
  const [nextPage, setNextPage] =
    useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null>(
      null
    );

  const [workoutCount, setWorkoutCount] = useState(0);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getWorkoutCount = () => {
    let count = 0;
    db.collection("workouts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(() => {
          count++;
        });
        setWorkoutCount(count);
      });
  };

  const getNextPaginatedWorkouts = () => {
    db.collection("workouts")
      .orderBy("date", "desc")
      .startAt(nextPage)
      .limit(rowsPerPage)
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
        if (temp.length > workoutCount) {
          setPrevPage(querySnapshot.docs[0]);
          setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        setWorkouts(temp);
      });
  };

  const getPrevPaginatedWorkouts = () => {
    db.collection("workouts")
      .orderBy("date", "desc")
      .startAt(prevPage)
      .limit(rowsPerPage)
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
        if (temp.length > workoutCount) {
          setPrevPage(querySnapshot.docs[0]);
          setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        setWorkouts(temp);
      });
  };

  useEffect(() => {
    getWorkoutCount();
    db.collection("workouts")
      .orderBy("date", "desc")
      .limit(rowsPerPage)
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
        setPrevPage(querySnapshot.docs[0]);
        setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setWorkouts(temp);
      });
  }, [rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log("forrige side: ", page, "ny side:", newPage);

    if (newPage > page) {
      console.log("vi skal hente neste side");
      getNextPaginatedWorkouts();
    } else {
      console.log("vi skal hente forrige side");
      getPrevPaginatedWorkouts();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="workout-list">
      {workouts.map((workout: Workout, index: number) => {
        return <WorkoutCard workout={workout} key={index} />;
      })}
      <TablePagination
        component="div"
        count={workoutCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
