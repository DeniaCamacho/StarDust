import React, { useState } from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/main.css"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { reg } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    reg(username, password).then(resp => {
      props.history.push("/")
    })
    // .catch(e => {})
  }
  return (
    <div className="mainLog">
      <form className="fill" onSubmit={handleSubmit}>
        <input
          id="user"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          id="pass"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="go" type="submit">
          Login
        </button>
      </form>
      <Link to="/login">Already A User? Log In!</Link>
    </div>
  )
}
