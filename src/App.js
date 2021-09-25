import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Register from "./screens/Register.jsx";
import Login from "./screens/Login.jsx";
import Activate from "./screens/Activate.jsx";
import ForgetPassword from "./screens/ForgetPassword.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";
import "./App.css";
import Tasks from "./screens/Tasks.jsx";
import Queries from "./screens/Queries.jsx";
import AddQueries from "./screens/AddQueries";
import SubmitTask from "./screens/SubmitTask.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/login" />
          </Route>
          <Route path="/home" exact render={(props) => <Home {...props} />} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/users/password/forgot"
            exact
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            path="/users/activate/:token"
            exact
            render={(props) => <Activate {...props} />}
          />
          <Route
            path="/users/password/reset/:token"
            exact
            render={(props) => <ResetPassword {...props} />}
          />
          <Route
            path="/users/tasks"
            exact
            render={(props) => <Tasks {...props} />}
          />
          <Route
            path="/users/queries"
            exact
            render={(props) => <Queries {...props} />}
          />
          <Route
            path="/users/addQueries"
            exact
            render={(props) => <AddQueries {...props} />}
          />
          <Route
            path="/submitTasks/:id"
            exact
            render={(props) => <SubmitTask {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
