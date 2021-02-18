import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/",
};

//! Removed logic from reducer to helper functions
const authStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const authSuccess = (state, userData) => {
  return {
    ...state,
    userId: userData.userId,
    token: userData.token,
    error: null,
    loading: false,
  };
};
const authFail = (state, error) => {
  return {
    ...state,
    error: error,
    loading: false,
  };
};

const authLogout = () => {
  return {
    ...initialState,
  };
};

const setAuthRedirectPath = (state, path) => {
  return {
    ...state,
    authRedirect: path,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action.error);

    case actionTypes.AUTH_LOGOUT:
      return authLogout();

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action.path);

    default:
      return state;
  }
};

export default reducer;
