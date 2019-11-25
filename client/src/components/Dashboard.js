import React, { useState } from "react"
import { useAuth, useChat } from "../hooks"
// import { Link } from "react-router-dom"

export default props => {
  const { username, signout } = useAuth()
  const [message, setMessage] = useState("")
  const { messages, users, add } = useChat()

  function handleSubmit(e) {
    e.preventDefault()
    add({ message, username })
    setMessage("")
  }

  return (
    <>
      <button id="signOut" onClick={e => signout()}>
        Sign Out
      </button>
      <div className="chatMain">
        <h1 className="hi"> Hello {username}!</h1>

        <form onSubmit={handleSubmit}>
          <input
            id="text"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button id="sub" type="submit">
            Send
          </button>
        </form>
        <div id="chat">
          <div id="users">
            {users.map((u, i) => (
              <p>{u.username}</p>
            ))}
          </div>
          <div id="messages">
            {messages.map((msg, i) => (
              <p className="msg" key={"message" + i}>
                {msg.username}:{msg.message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
