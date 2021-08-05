import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  data: LineChartData[];
};

export const LineChartComponent = ({ data }: Props) => {
  return (
    <div className="line-chart-container">
      <LineChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="kg" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </div>
  );
};
