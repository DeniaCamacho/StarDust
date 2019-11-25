import React from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import AboutMe from "./AboutMe"

export default props => {
  return (
    <>
      <Route path="/" component={Dashboard} />
      <Route path="/about" component={AboutMe} />
    </>
  )
}
