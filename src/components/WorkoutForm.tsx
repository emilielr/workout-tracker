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
import "./Form.scss";
import { useState } from "react";
import { db } from "../firebase";
import AddIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";
import { alertEnum, categoryEnum } from "../utils/enums";
import { AlertComponent } from "./AlertComponent";

type SimpleExercise = {
  name: string;
  sets: string;
  reps: string;
  kg: string;
};

export const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [category, setCategory] = useState<categoryEnum>(categoryEnum.empty);
  const [rows, setRows] = useState<SimpleExercise[]>([]);
  const [alert, setAlert] = useState<alertEnum>();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [exercise, setExercise] = useState<SimpleExercise>({
    name: "",
    sets: "",
    reps: "",
    kg: "",
  });

  const handleChange =
    (prop: keyof SimpleExercise) => (event: ChangeEvent<HTMLInputElement>) => {
      setExercise({ ...exercise, [prop]: event.target.value });
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
    setExercise({ name: "", sets: "", reps: "", kg: "" });
  };

  const resetFields = () => {
    setWorkoutName("");
    setCategory(categoryEnum.empty);
    setRows([]);
    setExercise({ name: "", sets: "", reps: "", kg: "" });
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
            {rows?.map((row: SimpleExercise) => {
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
