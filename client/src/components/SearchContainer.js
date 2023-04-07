import { FormRow, FormRowSelect } from '.'; // from '.' MEANS FROM THE SAME FOLDER 
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
// BELOW INPUTS TO BE USED IBN IMPLEMENTING DEBOUNCE FOR SEARCH JOB FUNCTIONALITY
import { useState, useMemo } from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  // GET GLOBAL VARIABLES/PROPERTY THAT HELP IN SEARCH FUNCTIONALITY
  const {
    isLoading,
    search,
    handleChange,
    searchStatus,
    statusOptions,
    jobTypeOptions,
    searchType,
    clearFilters,
    sort,
    sortOptions,
  } = useAppContext();

  // CHANGE THE STATE SEARCH VALUES AS USER TYPES IN THE FRONT END
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  // CLEAR THE SEARCH INPUTS
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  // SEARCH WITH DEBOUNCE FUNCTIONALITY - THIS TRIGGERS THE SEARCH FUNCTIONALITY TO OCCUR
  // AFTER THE USER HAS FINISHED WHAT HE WAS TYPING AND A SECOND IS PASSED, INSTEAD OF DOING
  // A SEARCH EVEN AFTER WHEN JUST A SINGLE LETTER IS TYPED - HELPS REDUCE CALLS TO THE SERVER
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(()=> {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  }
  const optimizedDebounce = useMemo(()=>debounce(), []);

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>

        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          ></FormRow>

          {/* search by status */}
          <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          ></FormRowSelect>

          {/* search by type */}
          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          ></FormRowSelect>

          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;