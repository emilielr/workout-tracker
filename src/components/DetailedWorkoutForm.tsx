import { ChangeEvent } from "react";
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import "./WorkoutForm.scss";
import "./DetailedWorkoutForm.scss";
import { useState } from "react";
import { db } from "../firebase";
import AddIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";
import { alertEnum, categoryEnum } from "../utils/enums";
import { AlertComponent } from "./AlertComponent";

export const emptySet: Sett = {
  kg: "",
  reps: "",
};

export const DetailedWorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [category, setCategory] = useState<categoryEnum>(categoryEnum.empty);
  const [rows, setRows] = useState<Exercise[]>([]);
  const [alert, setAlert] = useState<alertEnum>();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    set1: emptySet,
    set2: emptySet,
    set3: emptySet,
    set4: emptySet,
    set5: emptySet,
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExercise({ ...exercise, name: event.target.value });
  };

  const handleSetChange =
    (set: keyof Exercise, prop: keyof Sett) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setExercise({
        ...exercise,
        [set]: { ...(exercise[set] as Sett), [prop]: event.target.value },
      });
    };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as categoryEnum);
  };

  const allFieldsFilledOut = () => {
    return (
      workoutName !== "" && category !== categoryEnum.empty && rows.length !== 0
    );
  };

  const addRow = () => {
    setRows([...rows!, exercise]);
    setExercise({
      name: "",
      set1: emptySet,
      set2: emptySet,
      set3: emptySet,
      set4: emptySet,
      set5: emptySet,
    });
  };

  const resetFields = () => {
    setWorkoutName("");
    setCategory(categoryEnum.empty);
    setRows([]);
    setExercise({
      name: "",
      set1: emptySet,
      set2: emptySet,
      set3: emptySet,
      set4: emptySet,
      set5: emptySet,
    });
  };

  const saveWorkout = () => {
    setOpenAlert(true);
    if (!allFieldsFilledOut()) {
      setAlertMessage("Du har ikke fyllt ut alle feltene");
      setAlert(alertEnum.error);
    } else {
      db.collection("workouts")
        .add({
          workoutName: workoutName,
          date: selectedDate,
          category: category,
          exercises: rows,
        })
        .then(() => {
          setAlertMessage("Du har lagt til en ny treningsøkt!");
          setAlert(alertEnum.success);
          resetFields();
        })
        .catch(() => {
          setAlertMessage("Noe gikk galt under lagringen.");
          setAlert(alertEnum.error);
        });
    }
  };

  const allInputSets = [
    exercise.set1,
    exercise.set2,
    exercise.set3,
    exercise.set4,
    exercise.set5,
  ];

  const renderInputSets = () => {
    return allInputSets.map((set: Sett, index: number) => {
      const setName = ("set" + (index + 1).toString()) as keyof Exercise;
      return (
        <TableCell align="right" key={index}>
          <InputBase
            placeholder="x"
            value={set.kg}
            onChange={handleSetChange(setName, "kg")}
          ></InputBase>{" "}
          kg /{" "}
          <span className="reps-input">
            <InputBase
              placeholder="x"
              value={set.reps}
              onChange={handleSetChange(setName, "reps")}
            ></InputBase>
          </span>
        </TableCell>
      );
    });
  };

  return (
    <div className="table-container">
      {openAlert && (
        <AlertComponent
          severity={alert!}
          message={alertMessage}
          setOpenAlert={setOpenAlert}
        />
      )}
      <h1>Opprett ny trening</h1>
      <div className="table-header">
        <div className="workout-name">
          <span className="text">Navn på trening:</span>
          <TextField
            value={workoutName}
            onChange={(event) => setWorkoutName(event.target.value)}
            size="small"
          ></TextField>
        </div>
        <div className="workout-date">
          <span className="text">Dato for økt:</span>
          <TextField
            id="date"
            size="small"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setSelectedDate(new Date(event.target.value))}
          />
        </div>
      </div>
      <div className="category">
        <span className="text">Velg kategori: </span>
        <FormControl>
          <InputLabel id="select-label"></InputLabel>
          <Select
            id="select"
            margin="dense"
            value={category}
            onChange={handleCategoryChange}
          >
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
            {rows?.map((row: Exercise) => {
              const allSets = [
                row.set1,
                row.set2,
                row.set3,
                row.set4,
                row.set5,
              ];

              return (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
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
            <TableRow>
              <TableCell>
                <InputBase
                  className="name"
                  placeholder="Skriv her.."
                  value={exercise.name}
                  onChange={handleNameChange}
                  required={true}
                ></InputBase>
              </TableCell>
              {renderInputSets()}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="btns">
        <Button startIcon={<AddIcon />} onClick={addRow} variant="outlined">
          Legg til øvelse
        </Button>
        <br />
        <Button
          startIcon={<SaveIcon />}
          onClick={saveWorkout}
          variant="outlined"
        >
          Lagre treningsøkt
        </Button>
      </div>
    </div>
  );
};
