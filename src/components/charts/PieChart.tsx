import { useEffect } from "react";
import { useState } from "react";
import { ResponsiveContainer, Pie, PieChart, Tooltip, Cell } from "recharts";
import { db } from "../../firebase";
import { categoryEnum } from "../../utils/enums";
import "./PieChart.scss";

type customizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: customizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p className="category">{`${payload[0].payload.category}`}</p>
        <p className="count">Antall økter: {`${payload[0].payload.count}`}</p>
      </div>
    );
  }
  return null;
};

export const PieChartComponent = () => {
  const [fullbodyCount, setFullbodyCount] = useState(0);
  const [legsCount, setLegsCount] = useState(0);
  const [upperbodyCount, setUpperbodyCount] = useState(0);

  useEffect(() => {
    getCategoryCount(categoryEnum.upperbody);
    getCategoryCount(categoryEnum.legs);
    getCategoryCount(categoryEnum.fullbody);
  });

  const getCategoryCount = (category: categoryEnum) => {
    db.collection("workouts")
      .where("category", "==", category)
      .get()
      .then((querySnapshot) =>
        category === categoryEnum.fullbody
          ? setFullbodyCount(querySnapshot.docs.length)
          : category === categoryEnum.upperbody
          ? setUpperbodyCount(querySnapshot.docs.length)
          : setLegsCount(querySnapshot.docs.length)
      );
  };
  const data: PieChartData[] = [
    { category: categoryEnum.fullbody, count: fullbodyCount },
    { category: categoryEnum.upperbody, count: upperbodyCount },
    { category: categoryEnum.legs, count: legsCount },
  ];
  return (
    <div className="pie-chart-container">
      <h3>Fordeling på økter</h3>
      <div className="figure">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="count"
              isAnimationActive={false}
              data={data}
              label={renderCustomizedLabel}
              labelLine={false}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="dots">
          <p>
            <span className="dot fullbody"></span> {categoryEnum.fullbody}
          </p>
          <p>
            <span className="dot legs"></span> {categoryEnum.legs}
          </p>
          <p>
            <span className="dot upperbody"></span> {categoryEnum.upperbody}
          </p>
        </div>
      </div>
    </div>
  );
};
