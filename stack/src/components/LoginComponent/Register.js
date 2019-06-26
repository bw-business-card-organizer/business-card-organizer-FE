import React from "react";
import { Link, Redirect } from "react-router-dom";
import { handleRegister } from "../withAuth/services";
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
        <HeaderBack>
          <Header>Register</Header>
        </HeaderBack>
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
