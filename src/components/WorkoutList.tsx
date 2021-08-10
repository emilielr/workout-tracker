import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { WorkoutCard } from "./WorkoutCard";
import firebase from "firebase";
import { categoryEnum } from "../utils/enums";

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
  const [category, setCategory] = useState<categoryEnum>(categoryEnum.all);

  const getWorkoutCount = (
    query: firebase.firestore.Query<firebase.firestore.DocumentData>
  ) => {
    let count = 0;
    query.get().then((querySnapshot) => {
      querySnapshot.forEach(() => {
        count++;
      });
      setWorkoutCount(count);
    });
  };

  const getNextPaginatedWorkouts = async () => {
    const query = getQuery();
    await query
      .orderBy("date", "desc")
      .startAfter(nextPage)
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

  const getPrevPaginatedWorkouts = async () => {
    const query = getQuery();
    await query
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

  const getQuery = useCallback(() => {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("workouts");

    if (category !== categoryEnum.all) {
      query = query.where("category", "==", category);
    }
    return query;
  }, [category]);

  useEffect(() => {
    const query = getQuery();
    getWorkoutCount(query);
    query
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
  }, [rowsPerPage, getQuery]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage > page) {
      getNextPaginatedWorkouts();
    } else {
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

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as categoryEnum);
    setPage(0);
  };

  return (
    <div className="workout-list">
      <h1>Alle økter</h1>
      <div className="filter-category">
        <span className="text">Filtrer etter kategori: </span>
        <FormControl>
          <InputLabel id="select-label"></InputLabel>
          <Select
            id="select"
            margin="dense"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value={categoryEnum.all}>{categoryEnum.all}</MenuItem>
            <MenuItem value={categoryEnum.fullbody}>
              {categoryEnum.fullbody}
            </MenuItem>
            <MenuItem value={categoryEnum.upperbody}>
              {categoryEnum.upperbody}
            </MenuItem>
            <MenuItem value={categoryEnum.legs}>{categoryEnum.legs}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
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
