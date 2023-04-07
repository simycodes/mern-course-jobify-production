import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  // data is = return { date, count };
  return (
    <ResponsiveContainer width='100%' height={300}>
       {/* PASS monthlyApplications: data TO THE BarChart COMPONENT */}
      <BarChart data={data} margin={{top: 50,}}> {/* MAKES SPACE FOR CHART - ALONE SHOWS NOTHING */}
        <CartesianGrid strokeDasharray='3 3' /> {/* DRAWS DOTTED LINES IN THE BACKGROUND */}
        {/* ASSIGN TO EACH SUB COMPONENT DIRECTLY WITHOUT ACCESSING OBJECT LIKE data.date */}
        <XAxis dataKey='date' />        {/* INSERTS THE X AXIS */}
        <YAxis allowDecimals={false} /> {/* INSERTS THE Y AXIS */}
        <Tooltip />                     {/* INSERTS THE TOOL TIP BOX SHOWS WHEN HOVERING THE CHART */}
        <Bar dataKey='count' fill='#2cb1bc' barSize={75} /> {/* INSERTS THE BARS */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent