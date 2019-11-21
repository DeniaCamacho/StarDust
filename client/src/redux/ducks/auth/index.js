import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { resolve } from "path"

//action def
const LOGIN_PENDING = "auth/LOGIN_PENDING"
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS"
const LOGIN_FAILURE = "auth/LOGIN_FAILURE"
const LOGOUT = "auth/LOGOUT"

//inital state
const initialState = {
  username: "",
  isAuthenticated: false,
  loading: false
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        username: action.payload
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, usename: "" }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

//action creators

function login(username, password) {
  return dispatch => {
    axios
      .post("/login", { username, password })
      .then(resp => {
        axios.defaults.headers.common = {
          Authorization: `Bearer${resp.data.token}`
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: username
        })
      })
      .catch(e => {
        dispatch({
          type: LOGIN_FAILURE
        })
      })
  }
}

function logout() {
  axios.defaults.headers.common = { Authorization: "" }
  return {
    type: LOGOUT
  }
}

export function useAuth() {
  const username = useSelector(appState => appState.authState.username)
  const dispatch = useDispatch()
  const signin = (username, password) => {
    dispatch({ type: LOGIN_PENDING })
    dispatch(login(username, password))
  }
  const signout = () => ({ type: LOGOUT })
  return { username, signin, signout }
}
