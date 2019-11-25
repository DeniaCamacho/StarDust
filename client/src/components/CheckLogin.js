import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../hooks"

import Routes from "./Routes"

export default props => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Routes /> : <Redirect to="/login" />
}
