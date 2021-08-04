import React, { ChangeEvent } from "react";
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

type Data = {
  name: string;
  sets: number;
  reps: number;
  kg: number;
};

export const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [rows, setRows] = useState<Data[]>([]);
  const [data, setData] = useState<Data>({
    name: "",
    sets: 0,
    reps: 0,
    kg: 0,
  });

  const handleChange =
    (prop: keyof Data) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };

  const addRow = () => {
    setRows([...rows!, data]);
    setData({ name: "", sets: 0, reps: 0, kg: 0 });
  };

  const saveWorkout = () => {
    db.collection("workouts").add({
      workoutName: workoutName,
      date: selectedDate,
      exercises: rows,
    });
  };

  return (
    <div className="table-container">
      <Button component={Link} to="/" variant="outlined">
        Tilbake
      </Button>
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
            {rows?.map((row: Data) => {
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
                  value={data.name}
                  onChange={handleChange("name")}
                  required={true}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={data.sets === 0 ? "" : data.sets}
                  onChange={handleChange("sets")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={data.reps === 0 ? "" : data.reps}
                  onChange={handleChange("reps")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  placeholder="Skriv her.."
                  value={data.kg === 0 ? "" : data.kg}
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
