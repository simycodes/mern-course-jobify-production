import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  // data is = return { date, count };
  return (
    <ResponsiveContainer width='100%' height={300}>
      {/* PASS monthlyApplications: data TO THE BarChart COMPONENT */}
      <AreaChart data={data} margin={{top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        {/* ASSIGN TO EACH SUB COMPONENT DIRECTLY WITHOUT ACCESSING OBJECT LIKE data.date */}
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent