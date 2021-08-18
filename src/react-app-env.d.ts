/// <reference types="react-scripts" />

type Workout = {
  id: string;
  workoutName: string;
  date: Date;
  exercises: Exercise2[];
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
  reps: string;
  name: string;
};

type Exercise2 = {
  name: string;
  set1: Sett;
  set2: Sett;
  set3: Sett;
  set4: Sett;
  set5: Sett;
};

type Sett = {
  reps: string;
  kg: string;
};
