// THIS IS THE ADD JOB SUB PAGE
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    // GET GLOBAL STATE VARIABLE NEEDED FOR ADDING A JOB
    const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext();

  // HANDLE REACT FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
    // VALIDATE INCOMING DATA
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if(isEditing) {
      editJob();
      return
    }
    createJob();
  };

  // GET USER INPUT
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    // CALL FUNCTION TO CHANGE THE GLOBAL CURRENT INPUT VARIABLES ACCORDING TO USER
    // ENTERED VALUE 
    handleChange({name, value});
  };

  return (
    <Wrapper>
      <form className='form'>
        {/* CHECK IF WE ARE IN THE ADD JOB OR EDIT JOB MODE */}
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        {/* onChange={handleJobInput} IS BEING REPLACED BY handleChange, handleChange={handleJobInput}
        AS handleChange IS A CUSTOM METHOD REPLACING onChange USED INSIDE FormRow COMPONENT */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />

          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            labelText='job type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* Button container */}
          {/* THE BUTTON BUTTON SHOULD ALWAYS BE PLACED IN FRONT OF THE CLEAR BUTTON - IF THE
          CLEAR BTN IS PLACED FIRST THEN USER CLICK ENTER ON KEYBOARD, CLEAR BTN WILL BE 
          TRIGGERED AND NOT THE SUBMIT BUTTON - HENCE NEED TO PLACE THE SUBMIT BTN FIRST */}
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>

            <button 
              className='btn btn-block clear-btn'
              onClick={(e)=> {
                e.preventDefault();
                clearValues();
                console.log('clicked');
              }}
              >
                clear
            </button>
          </div>
          
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;