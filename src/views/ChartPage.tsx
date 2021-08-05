import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LineChartComponent } from "../components/LineChart";
import { db } from "../firebase";
import { usePrevious } from "../utils/comparison";
import { simpleFormatDate } from "../utils/date";
import "./ChartPage.scss";

export const ChartPage = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState<LineChartData[]>([]);

  const prevData = usePrevious(data);

  const getExercise = (e: string) => {
    if (data === prevData) {
      db.collection("workouts")
        .get()
        .then((querySnapshot) => {
          let tempData: LineChartData[] = [];
          querySnapshot.forEach((doc) => {
            doc.data().exercises.forEach((exercise: Exercise) => {
              if (exercise.name.toLowerCase().includes(e.toLowerCase())) {
                tempData.push({
                  date: simpleFormatDate(doc.data().date.toDate()),
                  kg: exercise.kg,
                  name: exercise.name,
                });
              }
            });
          });
          tempData.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
          setData(tempData);
        });
    }
  };
  return (
    <div className="chart-container">
      <Button component={Link} to="/" variant="outlined">
        Tilbake
      </Button>
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
          onClick={() => getExercise(userInput)}
        >
          Søk
        </Button>
      </div>
      <LineChartComponent data={data} />
    </div>
  );
};
