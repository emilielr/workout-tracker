import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LineChart.scss";

type Props = {
  data: LineChartData[];
};

export const LineChartComponent = ({ data }: Props) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="exercise">{`${payload[0].payload.name}`}</p>
          <p className="date">{label}</p>
          <p className="value">
            Vekt: {payload[0].payload.kg + payload[0].name}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="line-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line dataKey="kg" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
