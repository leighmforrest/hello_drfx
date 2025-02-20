export const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  };
  

  const authReducer = (state, action) => {
    switch (action.type) {
      case "SET_AUTH_STATUS":
        return { ...state, isAuthenticated: action.payload };
      case "USER_FETCH_SUCCESS":
        return { ...state, user: action.payload, isAuthenticated: true };
      case "USER_LOGOUT":
      case "AUTH_REQUEST_FAILURE":
        return { ...state, user: null, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  
  export default authReducer