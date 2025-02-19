export const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  

const authReducer = (state, action) => {
    switch (action.type) {
      case "AUTH_REQUEST_INIT":
        return { ...state, loading: true, error: null };
      case "USER_FETCH_SUCCESS":
        return { ...state, user: action.payload, loading: false };
      case "USER_LOGIN_SUCCESS":
        return { ...state, loading: false };
      case "AUTH_REQUEST_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "USER_LOGOUT":
        return { ...initialState };
      default:
        return state;
    }
  };
  
  export default authReducer