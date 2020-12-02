import logo from "./logo.svg"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import { Route, Switch, BrowserRouter } from "react-router-dom"
import Grid from "@material-ui/core/Grid"

import Header from "./pages/layouts/Header"
import Landing from "./pages/layouts/Landing"

import AddTask from "./pages/dashboard/AddTask"
import ListTasks from "./pages/dashboard/ListTasks"
import Main from "./pages/dashboard/Main"

import { ProtectedRoute } from "./utils/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Grid>
          <Route render={(props) => <Header {...props} />} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Main} />
          <ProtectedRoute exact path="/list-tasks" component={ListTasks} />
          <ProtectedRoute exact path="/create-task" component={AddTask} />
        </Grid>
      </Switch>
    </BrowserRouter>
  )
}

export default App
