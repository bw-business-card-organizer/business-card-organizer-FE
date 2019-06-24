import React from "react";
import { Link, Redirect } from "react-router-dom";
import { handleRegister } from "../withAuth/services";
import styled from "styled-components";

const LoginForm = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  width: 350px;
  height: 500px;
`;

const TextInput = styled.input`
  margin: 25px;
  width: 75%;
  height: 25px;
  border: none;
  border-bottom: 2px solid black;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: none;
`;

export default class Login extends React.Component {
  state = {
    registered: false,
    email: "",
    password: "",
    confirmpassword: "",
    fName: "",
    lName: ""
  };
  Login = () => {
    const { email, password, confirmpassword, fName, lName } = this.state;
    if (
      email.length > 0 &&
      password.length > 0 &&
      confirmpassword.length > 0 &&
      fName.length > 0 &&
      lName.length > 0
    ) {
      if (password === confirmpassword) {
        let register = handleRegister({ email, password, fName, lName });
        if (register) {
          this.setState({
            registered: true
          });
        }
      }
    }
  };
  textFormHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { registered } = this.state;
    if (registered) {
      return <Redirect to="/login" />;
    }
    return (
      <LoginForm>
        <h1>Register</h1>
        <TextInput
          type="text"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.textFormHandler}
        />
        <TextInput
          type="text"
          name="fName"
          placeholder="First Name"
          value={this.state.fName}
          onChange={this.textFormHandler}
        />
        <TextInput
          type="text"
          name="lName"
          placeholder="Last Name"
          value={this.state.lName}
          onChange={this.textFormHandler}
        />

        <TextInput
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.textFormHandler}
        />
        <TextInput
          type="password"
          name="confirmpassword"
          placeholder="confirm password"
          value={this.state.confirmpassword}
          onChange={this.textFormHandler}
        />
        <Button onClick={this.Login}>Register</Button>
      </LoginForm>
    );
  }
}
