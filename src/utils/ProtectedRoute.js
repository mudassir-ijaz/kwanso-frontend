import React from "react"
import { Route, Redirect } from "react-router-dom"
import Authorization from "./Authorization"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Authorization.isUser().auth) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}
