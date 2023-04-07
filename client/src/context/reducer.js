// GETTING VARIOUS NAME ACTIONS FROM THE ACTION FILE
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR, 
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from './actions'

// INITIAL STATE VARIABLES WILL ALL BE SET TO NULL WHEN LOGGING OUT
import { initialState } from './appContext';

const reducer = (state, action) => {
  // DISPLAY THE ALERT MESSAGE
  if (action.type === DISPLAY_ALERT) {
    return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
    };
   }
  // CLEAR THE ALERT MESSAGE (AFTER SOME SECONDS)
  if (action.type === CLEAR_ALERT) {
    return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
    };
   }
  // START REGISTER USER PROCESS
  if (action.type === REGISTER_USER_BEGIN) {
    // RETURN CURRENT STATE AND CHANGE IS LOADING TO FALSE TO MAKE SUBMIT BTN INACTIVE
    return {...state, isLoading: true}
  }
  // IF REGISTRATION IS SUCCESSFUL
  if (action.type === REGISTER_USER_SUCCESS) {
    // RETURN CURRENT STATE AND CHANGE IS LOADING TO FALSE TO MAKE SUBMIT BTN INACTIVE
    return {
      ...state, 
      isLoading: false,
      // token: action.payload.token, USED IN LOCAL STORAGE WITH JWT
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    }
  }
  // IF REGISTRATION FAILED 
  if (action.type === REGISTER_USER_ERROR) {
    // RETURN CURRENT STATE AND CHANGE IS LOADING TO FALSE TO MAKE SUBMIT BTN INACTIVE
    return {
      ...state, 
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // START USER LOGIN PROCESS
  if (action.type === LOGIN_USER_BEGIN) {
  return {
    ...state,
    isLoading: true,
  };
}
// IF LOGIN IS SUCCESSFUL
if (action.type === LOGIN_USER_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    user: action.payload.user,
    // token: action.payload.token, // USED IN LOCAL STORAGE WITH JWT
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
    showAlert: true,
    alertType: 'success',
    alertText: 'Login Successful! Redirecting...',
  };
}
// IF LOGIN FAILED
if (action.type === LOGIN_USER_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    // alertText: 'Invalid Credentials!',
    alertText: action.payload.msg,
  };
}
// IF THE SIDE BAR IS TOGGLED/CLICKED
if (action.type === TOGGLE_SIDEBAR) {
  return {
    ...state,
    showSidebar: !state.showSidebar,
  };
}
// WHEN USER LOGS OUT
if (action.type === LOGOUT_USER ) {
  return {
    ...initialState, 
    userLoading: false,
    user:null,
    // token:null, // USED IN LOCAL STORAGE WITH JWT
  };
}
// START THE USER UPDATE PROCESS
if (action.type === UPDATE_USER_BEGIN) {
  return { ...state, isLoading: true }
}
// IF USER UPDATE IS SUCCESSFUL
if (action.type === UPDATE_USER_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    // token:action.payload.token, // USED IN LOCAL STORAGE WITH JWT
    user: action.payload.user,
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
    showAlert: true,
    alertType: 'success',
    alertText: 'User Profile Updated!',
  }
}
// IF USER UPDATE FAILED
if (action.type === UPDATE_USER_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  }
}
// IF THE USER CHANGES THE INPUT VALUES - DURING ADDITION OR UPDATING OF A JOB
if (action.type === HANDLE_CHANGE) {
  return {
    ...state,
    page: 1,
    [action.payload.name]: action.payload.value
  }
}
// IF THE USER CLEARS THE FORM INPUT FIELDS DURING THE ADD JOB PROCESS / EDIT PROCESS
if (action.type === CLEAR_VALUES) {
  // SETTING VALUES THAT WILL RESET/CLEAR THE FORM GLOBALLY
  const initialState = {
    isEditing: false,
    editJobId: '',
    position: '',
    company: '', 
    jobLocation: state.userLocation,
    jobType: 'full-time',
    status: 'pending',
  }
  // RETURN ALL THE STATE VALUES AS THEY ARE BUT CHANGE THOSE IN THE initialState OBJECT
  return { ...state, ...initialState }
}
// START THE JOB ADDITION PROCESS
if (action.type === CREATE_JOB_BEGIN) {
  return { ...state, isLoading: true };
}
// IF JOB CREATION IS SUCCESSFUL
if (action.type === CREATE_JOB_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'success',
    alertText: 'New Job Created!',
  };
}
// IF THERE IS AN ERROR WITH JOB CREATION PROCESS
if (action.type === CREATE_JOB_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  };
}
// START THE GET ALL JOBS REQUEST PROCESS
if (action.type === GET_JOBS_BEGIN) {
  return { ...state, isLoading: true, showAlert: false };
}
// IF GETTING ALL JOBS WORKS
if (action.type === GET_JOBS_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    jobs: action.payload.jobs,
    totalJobs: action.payload.totalJobs,
    numOfPages: action.payload.numOfPages,
  };
}
// STARTING TO EDIT A JOB
if(action.type === SET_EDIT_JOB) {
  // FIND THE JOB TO EDIT JUST IN THE APP STATE AND NOT SENDING REQUEST TO DB, AS ALL JOBS
  // HAVE ALREADY BEEN FETCHED AND STORED IN THE APP jobs STATE ARRAY VARIABLE
  const job = state.jobs.find((job)=> job._id === action.payload.id);
  // GET THE ACTUAL DETAILS OF JOB TO BE UPDATED
  const { _id, position, company, jobLocation, jobType, status } = job;
  return {
    ...state,
    isEditing: true,
    editJobId: _id,
    position,
    company,
    jobLocation,
    jobType,
    status,
  };
}

// DO THE JOB DELETION PROCESS
if (action.type === DELETE_JOB_BEGIN) {
  return { ...state, isLoading: true };
}
// IF THERE IS A DELETE JOB ERROR
if (action.type === DELETE_JOB_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  }
}
// IF DELETE JOB IS SUCCESSFUL
if (action.type === DELETE_JOB_SUCCESS) {
  console.log("Working!!")
  return { 
    ...state,
    showAlert: true,
    alertType: 'success',
    alertText: 'Job deleted successfully',
  }
}
// BEGIN JOB EDIT PROCESS
if (action.type === EDIT_JOB_BEGIN) {
  return { ...state, isLoading: true };
}
// DO THE ACTUAL JOB EDIT PROCESS
if (action.type === EDIT_JOB_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'success',
    alertText: 'Job Updated!',
  };
}
// IF THERE IS AN ERROR WITH EDIT JOB PROCESS
if (action.type === EDIT_JOB_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  };
}
// BEGIN THE SHOW STATS FUNCTIONALITY
if (action.type === SHOW_STATS_BEGIN) {
  return { ...state, isLoading: true, showAlert: false };
}
// FUNCTION TO DISPLAY THE STATS
if (action.type === SHOW_STATS_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    stats: action.payload.stats,
    monthlyApplications: action.payload.monthlyApplications,
  };
}
// FUNCTION TO CLEAR THE FILER INPUT VALUES
if (action.type === CLEAR_FILTERS) {
  return {
    ...state,
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
  };
}

// WHEN USER CLICKS NEXT/PREV BUTTONS TO CHANGE PAGE NUMBER
if (action.type === CHANGE_PAGE) {
  return { ...state, page: action.payload.page };
}

// IF USER MAKES A PAGE REFRESH
if (action.type === GET_CURRENT_USER_BEGIN) {
  return { ...state, userLoading: true, showAlert: false };
}

// IF GETTING CURRENT USER IS SUCCESSFUL AFTER DOING A PAGE REFRESH
if (action.type === GET_CURRENT_USER_SUCCESS) {
  return {
    ...state,
    userLoading: false,
    user: action.payload.user,
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
  };
}

  throw new Error(`no such action :${action.type}`);
};

export default reducer;