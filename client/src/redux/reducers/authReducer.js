
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'SIGNUP_REQUEST':
      case 'PRODUCT_REQUEST':
      case 'PAYMENT_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
  
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
       
  
      case 'PRODUCT_SUCCESS':
        // Handle product success if needed
        return state;
  
      case 'PAYMENT_SUCCESS':
        // Handle payment success if needed
        return state;
  
      case 'LOGIN_FAILURE':
      case 'SIGNUP_FAILURE':
      case 'PRODUCT_FAILURE':
      case 'PAYMENT_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  