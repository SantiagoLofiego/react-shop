export const userInitialState = {
  user: {
    authenticated: false,
    uid: null,
    email: null,
    displayName: 'guest',
  },
  checking: false,
  error: null
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, user: action.payload, error: null };
    }
    case 'LOGOUT': {

      return {...userInitialState}
    }
    case 'UPDATE': {

      return {...state, user:{...state.user, ...action.payload} }
    }
    case 'CHECKING':
      return { ...state, checking: action.payload }
    case 'ERROR':
      return { ...state, error: action.payload}
    default:
      return state;
  }
}


