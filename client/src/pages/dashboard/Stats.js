import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  // don't add showStats(); to dependency as it will create an infinite loop of calling
  // getJobs in every rerendering process of this component/app, instead add the code
  // // eslint-disable-next-line

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {/* DISPLAY THE CHART ONLY IF THERE ARE JOB APPLICATIONS */}
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;