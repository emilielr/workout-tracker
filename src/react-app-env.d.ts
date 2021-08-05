/// <reference types="react-scripts" />

type Workout = {
  id: string;
  workoutName: string;
  date: Date;
  exercises: Exercise[];
};

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  kg: string;
};

type LineChartData = {
  date: string;
  kg: string;
  name: string;
};
