import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { emptySet } from "../components/DetailedWorkoutForm";
import { LineChartComponent } from "../components/charts/LineChart";
import { db } from "../firebase";
import { usePrevious } from "../utils/comparison";
import { simpleFormatDate } from "../utils/date";
import "./ChartPage.scss";

export const ChartPage = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState<LineChartData[]>([]);

  const [lowerBound, setLowerBound] = useState(8);
  const [upperBound, setUpperBound] = useState(10);
  const repRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const prevData = usePrevious(data);

  const isSetInRepRange = (reps: string) => {
    return Number(reps) <= upperBound && Number(reps) >= lowerBound
      ? true
      : false;
  };

  /*
  Get sets on exercise and display the set with highest weight (kg)
  in the rep range. Rep range is set by user, and is default set to 8-10
  */
  const getExercise2 = (e: string) => {
    if (data === prevData) {
      db.collection("workouts")
        .orderBy("date")
        .get()
        .then((querySnapshot) => {
          let tempData: LineChartData[] = [];
          let highestKg = 0;
          let bestSet = emptySet;
          querySnapshot.forEach((doc) => {
            doc.data().exercises.forEach((exercise: Exercise2) => {
              if (exercise.name.toLowerCase() === e.toLowerCase()) {
                const allSets = [
                  exercise.set1,
                  exercise.set2,
                  exercise.set3,
                  exercise.set4,
                  exercise.set5,
                ];
                allSets.forEach((set: Sett) => {
                  if (
                    isSetInRepRange(set.reps) &&
                    Number(set.kg) >= highestKg
                  ) {
                    highestKg = Number(set.kg);
                    bestSet = set;
                  }
                });
              }
            });
            if (bestSet.kg !== "") {
              tempData.push({
                date: simpleFormatDate(doc.data().date.toDate()),
                kg: bestSet.kg,
                reps: bestSet.reps,
                name: e,
              });
            }
            highestKg = 0;
            bestSet = emptySet;
          });
          setData(tempData);
        });
    }
  };

  const handleLowerBound = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLowerBound(Number(event.target.value));
    if (upperBound < Number(event.target.value)) {
      setUpperBound(Number(event.target.value));
    }
  };

  const handleUpperBound = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUpperBound(Number(event.target.value));
    if (lowerBound > Number(event.target.value)) {
      setLowerBound(Number(event.target.value));
    }
  };

  useEffect(() => {
    if (userInput !== "") {
      getExercise2(userInput);
    }
    // eslint-disable-next-line
  }, [lowerBound, upperBound]);

  return (
    <div className="chart-container">
      <h1>Progresjonsgraf</h1>
      <div className="search-container">
        <p>Skriv inn hvilken øvelse du vil se:</p>
        <TextField
          className="input"
          size="small"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        ></TextField>
        <Button
          id="search-btn"
          disabled={userInput === "" ? true : false}
          variant="outlined"
          size="small"
          onClick={() => getExercise2(userInput)}
        >
          Søk
        </Button>
      </div>
      <div className="rep-range">
        <div className="low-rep-range">
          Velg reps mellom:
          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <Select
              id="select"
              margin="dense"
              value={lowerBound}
              onChange={handleLowerBound}
            >
              {repRange.map((rep: number) => {
                return (
                  <MenuItem key={rep} value={rep}>
                    {rep}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="high-rep-range">
          og:{" "}
          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <Select
              id="select"
              margin="dense"
              value={upperBound}
              onChange={handleUpperBound}
            >
              {repRange.map((rep: number) => {
                return (
                  <MenuItem key={rep} value={rep}>
                    {rep}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      <LineChartComponent data={data} />
    </div>
  );
};
