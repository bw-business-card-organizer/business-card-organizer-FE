import React from "react";
import "./App.css";
import PrivateRoute from "./components/withAuth/authRouter";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/LoginComponent/Login";
import Register from "./components/LoginComponent/Register";
import Nav from "./components/Nav/Nav";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
function App() {
  return (
    <Router>
      <Nav />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/add" component={Add} />
      <PrivateRoute exact path="/edit" component={Edit} />
    </Router>
  );
}

export default App;
