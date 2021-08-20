/// <reference types="react-scripts" />

type Workout = {
  id: string;
  workoutName: string;
  date: Date;
  exercises: Exercise[];
};

type LineChartData = {
  date: string;
  kg: string;
  reps: string;
  name: string;
};

type PieChartData = {
  count: number;
  category: categoryEnum;
};

type Exercise = {
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
