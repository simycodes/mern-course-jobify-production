// THIS IS A CONTEXT AND USE REDUCER FUNCTIONALITY FILE
import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

// GETTING THE DISPATCH-REDUCER FUNCTION - DISPATCH HANDLES MULTIPLE USE STATES IN A 
// SWITCH CODE FLOW
import reducer from './reducer';

// GETTING VARIOUS ACTIONS NAMES FROM THE ACTION FILE FOR THE dispatch function IN REDUCER FUNCION
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
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from './actions';

// BELOW CODE IS USED WHEN HANDLING(STORING & RETRIEVING) JWT WITH LOCAL STORAGE & NOT COOKIES
// GET LOGGED-IN USER DETAILS IN CASE OF PAGE REFRESH AS REACT HAS NO DATA PERSISTENCE
// ON BROWSER
// const token = localStorage.getItem('token');
// const user = localStorage.getItem('user');
// const userLocation = localStorage.getItem('location');

// THIS THE GLOBAL STATE OBJECT VARIABLE USED IN THE APP - useReducer - HAVING CHANGING
// STATE VARIABLES
const initialState = {
  userLoading: true, // help display loading icon when after a page refresh when getting user data
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null, // user? JSON.parse(user): null, AND token: token, - IF LOCAL STORAGE IS USED IN PLACE OF COOKIES
  userLocation: '', // userLocation || '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '', 
  jobLocation: '', // jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

// CREATING THE CONTEXT VARIABLE THAT WILL BE USED TO PASS VARIABLES IN ALL COMPONENTS OF
// THE APP
const AppContext = React.createContext();

// AppProvider COMPONENT WILL HOLD AND RETURN THE CONTEXT VARIABLE/COMPONENT THAT WILL
// ACCESSED GLOBALLY IN ALL COMPONENTS OF THE APP (LIKE SESSION VARIABLES - PHP)
const AppProvider = ({ children }) => {
  // state - VARIABLE THAT WILL BE GLOBALLY ACCESSED USING THE CONTEXT VARIABLE/COMPONENT
  const [state, dispatch] = useReducer(reducer, initialState);

  // AXIOS INSTANCE SETUP APPROACH USING axios.create() WITH INTERCEPTORS - (RECOMMENDED WAY TO USE AXIOS)
  // authFetch IS AN AXIOS INSTANCE-OBJECT BEING USED TO SEND DATA AND TOKENS
  const authFetch = axios.create({
    baseURL: '/api/v1'
  })

  // BELOW CODE IS USED WHEN LOCAL STORAGE IS USED INSTEAD OF COOKIES WHEN HANDLING JWT
  // AXIOS REQUEST INTERCEPTORS - HELP HANDLE 401-AUTHENTICATION ERRORS ON THE FRONTEND.
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     // headers HELPS SEND DATA(token&update data) FROM THE FRONT-END TO THE BACKEND USING headers OBJECT
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // AXIOS RESPONSE INTERCEPTORS - HELP HANDLE 401-AUTHENTICATION ERRORS ON THE FRONTEND. 
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        // console.log('AUTH ERROR'); 
        logoutUser(); // HANDLING 401-AUTHENTICATION ERRORS - BY LOGGING OUT THE USER
      }
      return Promise.reject(error);
    }
  );
 
  // FUNCTION TO CALL THE DISPATCH METHOD HANDLE AN ACTION
  const displayAlert = () => {
    // dispatch() CALLS THE reducer METHOD TO HANDLE THE ACTION - DISPATCH REPRESENTS reducer
    dispatch({type: DISPLAY_ALERT}); 
    clearAlert();
  }

  // FUNCTION TO CLEAR THE ALERT AFTER 3 SECONDS
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT});
    }, 4000);
  };

  // BELOW CODE IS USED WHEN LOCAL STORAGE IS USED INSTEAD OF COOKIES WHEN HANDLING JWT
  // FUNCTION TO ADD LOGGED-IN USER TO LOCAL STORAGE FOR PERSISTENT LOGIN AFTER PAGE REFRESH
  // const addUserToLocalStorage = ({ user, token, location }) => {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('location', location);
  // };

  // BELOW CODE IS USED WHEN LOCAL STORAGE IS USED INSTEAD OF COOKIES WHEN HANDLING JWT
  // FUNCTION TO REMOVE LOGGED-IN USER FROM LOCAL STORAGE
  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('location');
  // };

  // FUNCTION TO REGISTER A USER
  // THE ARGUMENT {type:REGISTER_USER_BEGIN} IS REFERRED TO AS ACTION IN THE REDUCER
  const registerUser = async(currentUser) => {
    // console.log(currentUser);
    dispatch({type:REGISTER_USER_BEGIN});
    try {
      // "proxy": "http://localhost:5000"(from front-end) + app.use('/api/v1/auth/',) from
      // server.js + (/register, ) (from authRoutes) - frontend & backend url must be same
      // SEND DATA TO THE SERVER USING REGISTER ROUTE WITH DATA OF NEW USER ATTACHED
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);

      // GET THE DATA FROM THE DATABASE TO THE FRONTEND
      // const {user, token, location} = response.data; // USED WITH LOCAL STORAGE JWT
      const {user, location} = response.data;
      
      // NOTIFY REGISTRATION WAS A SUCCESS
      dispatch({type: REGISTER_USER_SUCCESS, payload: {user, location}});
      // ADD USER DETAILS FROM DATABASE TO LOCAL STORAGE FOR DATA PERSISTANCE
      // addUserToLocalStorage({user, token, location}); // USED WITH LOCAL STORAGE JWT
    } catch (error) {
      console.log(error.response);
      // NOTIFY USER OF REGISTRATION ERROR
      dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}});
    }
    // CLEAR EITHER THE REGISTRATION SUCCESS OR ERROR MESSAGE IN 3 SECONDS
    clearAlert();
  }

  // FUNCTION TO LOGIN A USER
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    // LOGIN BY SENDING LOGIN USER DETAILS TO THE SERVER
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      // GET THE USER DATA FROM THE DATABASE AND SEND TO THE STORE ON FRONT END & FOR LOGIN SESSION 
      // const { user, token, location } = data; // USED WITH LOCAL STORAGE JWT
      const { user, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
        // payload: { user, token, location }, // USED WITH LOCAL STORAGE JWT
      });
      // ADD LOGIN DETAILS TO THE LOCAL STORAGE FOR SESSION LOGIN PERSISTENCE
      // addUserToLocalStorage({ user, token, location }); // USED WITH LOCAL STORAGE JWT
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // FUNCTION TO TOGGLE THE SIDE BAR
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  }

  // FUNCTION TO LOGOUT THE USER
  const logoutUser = async () => {
    await authFetch.get('/auth/logout'); // THIS IS NOT CALLED WHEN LOCAL STORAGE IS SUED
    dispatch({ type: LOGOUT_USER});
    // REMOVE USER FROM LOCAL STORAGE AS WELL
    // removeUserFromLocalStorage();
    
  }

  // FUNCTION TO UPDATE A USER - Manual Approach OF SETTING UP AXIOS
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      // currentUser IS SECOND ARGUMENT(data to send to database),
      // authFetch IS AN AXIOS INSTANCE-OBJECT BEING USED TO SEND DATA AND TOKENS
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      // DESTRUCTURE THE RECEIVED DATA FROM THE USER THAT WILL USED FOR UPDATING
      // const { user, location, token } = data; // USED WITH LOCAL STORAGE JWT
      const { user, location } = data;

      // CALL REDUCER TO UPDATE, - payload - IS THE DATA SENT TO THE REDUCER FOR UPDATING
      // dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token },}); // USED WITH LOCAL STORAGE JWT
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location }});
      // UPDATE THE FRONT-END USER DETAILS BY ADDING THE NEW USER DETAILS TO THE LOCAL STORAGE
      // addUserToLocalStorage({ user, location, token }); // USED WITH LOCAL STORAGE JWT
    } catch (error) {
      if(error.response.status !== 401) {
        dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } });
      }  
    }

    clearAlert();
  };

  // FUNCTION TO CHANGE THE GLOBAL FORM CURRENT INPUT VARIABLES ACCORDING TO USER
  // ENTERED VALUES 
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value }})
  }

  // FUNCTION TO CLEAR THE FORM INPUT FIELDS DURING THE ADD JOB PROCESS
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  }

  // FUNCTION TO ADD A JOB
  const createJob = async() => {
    dispatch({type:CREATE_JOB_BEGIN});
    try {
      const { position, company, jobLocation, jobType, status } = state;
      // CREATE JOB IN DB - INTERCEPTORS ADD THE JWT WHEN SENDING THIS REQUEST
      await authFetch.post('/jobs',{ position, company, jobLocation, jobType, status });
      dispatch({type:CREATE_JOB_SUCCESS});
      dispatch({type:CLEAR_VALUES});
    } catch (error) {
      if(error.response.status === 401) return
      dispatch({
        type:CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      });
    }

    clearAlert();
  }

  // FUNCTION TO GET ALL THE JOBS
  const getJobs = async () => {
    // let url = `/jobs`; - BASIC URL THAT GETS ALL JOBS - NO QUERY PARAMS USED
    // GET ALL GLOBAL STATE VARIABLES THAT WILL BE USED IN FILTERING JOBS FROM DATABASE
    const { page, search, searchStatus, searchType, sort } = state;
    // MAKE A DYNAMIC URL THAT WILL BE USED TO GET AND FILTER JOBS FROM THE DATABASE
    let url = `/jobs?pages=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    // ADD SEARCH QUERY IF ITS ENTERED BY THE USER
    if (search) {
      url = url + `&search=${search}`;
    }
    // SET THE LOADING COMPONENT ON SCREEN
    dispatch({ type: GET_JOBS_BEGIN });
    // SEND QUERY TO THE BACKEND TO GET THE JOBS (FILTERED JOBS ACCORDING TO USER PREFERENCES)
    try {
      const { data } = await authFetch(url); // authFetch(url) is actually authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response);
      // IF 500, 404 OR 401 ERRORS OCCUR, LOGOUT THE USER SO HE CAN LOGIN AGAIN
      logoutUser();
    }
    clearAlert(); // HELPS CLEAR ANY ALERT FROM OTHER PAGES THAT MAY BE STILL BE DISPLAYING
  }

  // STARTS THE EDIT SINGLE JOB PROCESS
  const setEditJob = (id) => {
    // console.log(`set edit job : ${id}`)
    dispatch({ type:SET_EDIT_JOB, payload: { id }})
  }

  // FUNCTION TO EDIT A JOB BEING UPDATED
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      // SEND PATCH REQUEST TO THE API WITH USER DATA FOR UPDATE PROCESS
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  // STARTS THE DELETE SINGLE JOB PROCESS - THIS CODE IS MODIFIED TO HAVE THE DELETE SUCCESS
  // MESSAGE(NOT ACCORDING TO TUTORIAL) - IF ANY ERRORS GET ORIGINAL CODE FROM INSTRUCTOR
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      setTimeout(()=> {
        dispatch({ type: DELETE_JOB_SUCCESS });
      }, 1000)
      // GET UPDATED LIST OF JOBS AFTER JOB DELETION SUCCESS
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // dispatch({ type: DELETE_JOB_SUCCESS });
    clearAlert();
  };

   // FUNCTION TO GET THE JOB STATS
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } 
    catch (error) {
        // console.log(error.response);
        logoutUser();
    }

    clearAlert()
  }

  // FUNCTION TO CLEAR THE SEARCH FILTERS INPUTS
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  }

  // FUNCTION TO MOVE TO NEXT/PREV PAGE
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  // FUNCTION TO FETCH USER DATA AFTER A PAGE REFRESH
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  // FUNCTION TO CALL getCurrentUser(); AFTER EVERY PAGE REFRESH & WHEN APP STARTS
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);


  return (
    // AppContext IS FEED/GIVEN ALL THE STATE VARIABLES USED BY THE reducer USING ...state
    // WHICH BECOME GLOBAL STATE VARIABLES & FUNCTIONS (SUCH AS displayAlert, registerUser) 
    // CALLING reducer VIA dispatch ARE PASSED AS WELL MAKING THEM APP GLOBAL METHODS
    <AppContext.Provider value={{
        ...state, 
        displayAlert, 
        registerUser, 
        loginUser, 
        toggleSidebar, 
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        getCurrentUser
      }}
      >
      {children}
      {/* THE CHILDREN IS THE APP - THE COMPONENT MAKING THE APP SINCE CONTEXT WILL SURROUND
      THE WHOLE APP - THE APP APP NEEDS TO BE RENDERED THROUGH IT AS IT BECOMES THE PARENT COMPONENT */}
    </AppContext.Provider>
  );
};

// THIS IS THE COMPONENT THAT WILL BE USED TO ACCESS AppContext WHICH HOLDS ALL GLOBAL
// STATE VARIABLES TO BE ACCESSED IN EVERY APP COMPONENT IN ORDER TO MANAGE APP STATE
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };