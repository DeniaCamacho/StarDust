import React, { useState } from "react"
import { useAuth } from "../hooks"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signin } = useAuth()
  function handleSubmit(e) {
    e.preventDefault()
    signin(username, password)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          name="pasword"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
