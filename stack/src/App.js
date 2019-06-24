import React from "react";
import "./App.css";
import PrivateRoute from "./components/withAuth/authRouter";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Register from "./components/LoginComponent/Register";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <Router>
      <Nav />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
