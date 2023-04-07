import React, { useState } from 'react';

import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);
  // GET NUMBER OF APPLICATION FOR EACH MONTH TO BE USED IN THE CHARTS 
  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      {/* TOGGLE BETWEEN AN AreaChart and a BarChart */}
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'View on Area Chart' : 'View on Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}

    </Wrapper>
  );
}