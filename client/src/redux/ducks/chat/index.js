import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import socket from "../../../lib/socket"

//action def
const ADD_MESSAGE = "chat/ADD_MESSAGE"
const GET_USERS = "chat/GET_USERS"
//initalState
const initialState = {
  messages: [],
  users: []
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case GET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

//actions
function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users
  }
}
function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}

// function add(message){
// socket.emit("message", message)
// }

export function useChat() {
  const dispatch = useDispatch()
  const messages = useSelector(appState => appState.chatState.messages)
  const users = useSelector(appState => appState.chatState.users)
  const add = message => {
    console.log("emitting message", message)
    socket.emit("message", message)
  }

  useEffect(() => {
    socket.on("message", message => {
      dispatch(addMessage(message))
    })
    socket.on("users", users => {
      dispatch(getUsers(users))
    })
  }, [dispatch])
  return { add, messages, users }
}
