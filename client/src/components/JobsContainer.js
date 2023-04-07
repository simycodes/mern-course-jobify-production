import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import Alert from './Alert';
import PageButtonContainer from './PageButtonContainer';

// 
const JobsContainer = () => {
  const {
    showAlert,
    getJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    page,
    numOfPages,
  } = useAppContext()
  // TRIGGER THE GET JOBS FROM THE DATABASE WHEN USER CHANGES search, searchStatus, searchType & sort
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [ page, search, searchStatus, searchType, sort]);
  // don't add getJobs() to dependency as it will create an infinite loop of calling
  // getJobs in every rerendering process of this component/app, instead add the code
  // // eslint-disable-next-line


  // DISPLAY LOADING ICON WHEN FETCHING JOBS
  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      { showAlert && <Alert />}
      
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
        
      <div className='jobs'>
        {
          jobs.map((job) => {
            return <Job key={job._id} {...job} />;
          })
        }
      </div>
      {/* PAGINATION BUTTONS */}
      { numOfPages > 1 && <PageButtonContainer /> }
      
    </Wrapper>
  );

}
export default JobsContainer