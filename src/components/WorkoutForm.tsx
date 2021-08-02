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
import { useState } from "react";
import { db } from "../firebase";

type Data = {
  name: string;
  sets: number;
  reps: number;
  kg: number;
};

export const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
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
      exercises: rows,
    });
  };
  console.log(workoutName);
  console.log(data);

  return (
    <div className="table-container">
      <h1>Opprett ny trening</h1>
      <div className="form-title">
        <p>Navn på trening</p>
        <TextField
          variant="outlined"
          value={workoutName}
          onChange={(event) => setWorkoutName(event.target.value)}
        ></TextField>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Øvelse</TableCell>
              <TableCell align="right">Sett</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">Kg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Knebøy</TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">50</TableCell>
            </TableRow>
            {rows?.map((row: Data) => {
              return (
                <TableRow key={row.name} component="th" scope="row">
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
                  value={data.name}
                  onChange={handleChange("name")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  value={data.sets === 0 ? "" : data.sets}
                  onChange={handleChange("sets")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  value={data.reps === 0 ? "" : data.reps}
                  onChange={handleChange("reps")}
                ></InputBase>
              </TableCell>
              <TableCell align="right">
                <InputBase
                  value={data.kg === 0 ? "" : data.kg}
                  onChange={handleChange("kg")}
                ></InputBase>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={addRow}>Legg til øvelse</Button>
      <Button onClick={saveWorkout}>Lagre treningsøkt</Button>
    </div>
  );
};
