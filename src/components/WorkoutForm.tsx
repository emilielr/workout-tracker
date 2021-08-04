import { ChangeEvent } from "react";
import {
  Button,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import "./WorkoutForm.scss";
import "./Form.scss";
import { useState } from "react";
import { db } from "../firebase";
import AddIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { alertEnum } from "../utils/enums";
import { AlertComponent } from "./AlertComponent";

export const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [rows, setRows] = useState<Exercise[]>([]);
  const [alert, setAlert] = useState<alertEnum>();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    kg: "",
  });

  const handleChange =
    (prop: keyof Exercise) => (event: ChangeEvent<HTMLInputElement>) => {
      setExercise({ ...exercise, [prop]: event.target.value });
    };

  const addRow = () => {
    setRows([...rows!, exercise]);
    setExercise({ name: "", sets: "", reps: "", kg: "" });
  };

  const saveWorkout = () => {
    setOpenAlert(true);
    db.collection("workouts")
      .add({
        workoutName: workoutName,
        date: selectedDate,
        exercises: rows,
      })
      .then(() => {
        setAlertMessage("Du har lagt til en ny treningsøkt!");
        setAlert(alertEnum.success);
      })
      .catch(() => {
        setAlertMessage("Noe gikk galt under lagringen.");
        setAlert(alertEnum.error);
      });
  };

  return (
    <div className="table-container">
      <Button component={Link} to="/" variant="outlined">
        Tilbake
      </Button>
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
            {rows?.map((row: Exercise) => {
              return (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.sets}</TableCell>
                  <TableCell align="right">{row.reps}</TableCell>
                  <TableCell align="right">{row.kg}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <InputBase
                  className="name"
                  placeholder="Skriv her.."
                  value={exercise.name}
                  onChange={handleChange("name")}
                  required={true}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={exercise.sets}
                  onChange={handleChange("sets")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={exercise.reps}
                  onChange={handleChange("reps")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={exercise.kg}
                  onChange={handleChange("kg")}
                ></InputBase>
              </TableCell>
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
