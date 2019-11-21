import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"
function App() {
  return (
    <div>
      <Router>
        <Route path="/login" exact component={Login} />
      </Router>
    </div>
  )
}

export default App
