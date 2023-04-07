// export const DISPLAY_ALERT = 'SHOW_ALERT';
export const DISPLAY_ALERT = 'DISPLAY_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const LOGOUT_USER = 'LOGOUT_USER';

export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const CLEAR_VALUES = 'CLEAR_VALUES';

export const CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR';

export const GET_JOBS_BEGIN = 'CREATE_JOBS_BEGIN';
export const GET_JOBS_SUCCESS = 'CREATE_JOBS_SUCCESS';

export const SET_EDIT_JOB = 'SET_EDIT_JOB';

export const DELETE_JOB_BEGIN = 'DELETE_JOB_BEGIN';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_ERROR = 'DELETE_JOB_ERROR';

export const EDIT_JOB_BEGIN = 'EDIT_JOB_BEGIN';
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
export const EDIT_JOB_ERROR = 'EDIT_JOB_ERROR';

export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN';
export const SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const CHANGE_PAGE = 'CHANGE_PAGE';

// HELPS IN FETCHING USER DATA AFTER A PAGE REFRESH
export const GET_CURRENT_USER_BEGIN = 'GET_CURRENT_USER_BEGIN';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';

// REFACTORING ABOVE CODE (REGISTER_USER_BEGIN,SUCCESS,ERROR COMBINED WITH
// LOGIN_USER_BEGIN,SUCCESS,ERROR) - OPTIONAL
// export const SETUP_USER_BEGIN = 'SETUP_USER_BEGIN';
// export const SETUP_USER_SUCCESS = 'SETUP_USER_SUCCESS';
// export const SETUP_USER_ERROR = 'SETUP_USER_ERROR';