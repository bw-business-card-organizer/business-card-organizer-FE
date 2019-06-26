import React from "react";
import { Link, Redirect } from "react-router-dom";
import { handleLogin, isLoggedIn } from "../withAuth/services";
import styled from "styled-components";

const LoginForm = styled.div`
  margin: auto;
  margin-top: 100px;
  background-color: white;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  width: 350px;
  height: auto;
  box-shadow: 4px 6px 7px 2px rgba(0, 0, 0, 0.75);
`;
const HeaderBack = styled.div`
  width:100%;
  height 50px;
  background-color:#8C8886;
  display:flex;
  justify-content:center;
`;
const Header = styled.h1`
  margin: 0px;
  padding: 0px;
  color: white;
`;
const TextInput = styled.input`
  margin: 25px;
  width: 75%;
  height: 25px;
  border: none;

  color: black;
  border-bottom: 2px solid black;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin: 25px;
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: none;
  background-color: #b26c43;
  color: white;
`;

export default class Login extends React.Component {
  state = {
    loggedIn: false,
    email: "",
    password: ""
  };
  Login = async () => {
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      await handleLogin({ email, password });
      this.LoginHandler();
    }
  };
  Register = () => {
    this.props.history.push("/register");
  };
  LoginHandler = () => {
    if (isLoggedIn()) {
      this.setState({
        loggedIn: true
      });
    }
  };
  componentDidMount = () => {
    this.LoginHandler();
  };
  textFormHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <LoginForm>
        <HeaderBack>
          <Header>Login</Header>
        </HeaderBack>
        <TextInput
          type="text"
          name="email"
          placeholder="email/username"
          value={this.state.email}
          onChange={this.textFormHandler}
        />

        <TextInput
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.textFormHandler}
        />
        <Button onClick={this.Login}>Login</Button>
        <Button onClick={this.Register}>Register</Button>
      </LoginForm>
    );
  }
}
