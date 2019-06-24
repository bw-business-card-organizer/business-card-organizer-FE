import React from "react";
import "./App.css";
import PrivateRoute from "./components/withAuth/authRouter";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Register from "./components/LoginComponent/Register";
function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
