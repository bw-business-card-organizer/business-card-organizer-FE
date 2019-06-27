import React from "react";
import styled from "styled-components";
import "./Nav.css";
import DarkImage from "./dark.png";
import LightImage from "./light.png";
import QRImage from "./qr.png";
import { logout, isLoggedIn } from "../withAuth/services";

import { withRouter } from "react-router-dom";
const NavDiv = styled.div`
  width: -webkit-fill-available;
  height: 75px;
  background-color: #4a7cfa;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 10px;
  box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.75);
  @media (max-width: 800px) {
    height: 50px;
  }
`;
const FlexinNav = styled.div`
  width: -webkit-fill-available;
  display: flex;
  justify-content: center;
`;
const Header = styled.h1`
  margin: 0px;
  cursor: pointer;
  padding: 0px;
  color: white;
  @media (max-width: 800px) {
    margin: auto;
  }
`;
const HeaderNav = styled.h1`
  margin: 0px 50px 0px 0px;
  cursor: pointer;
  padding: 0px;
  color: white;
  @media (max-width: 800px) {
    margin: auto;
  }
`;
const Dark = styled.img`
  cursor: pointer;
  position: absolute;
  width: 25px;
  align-self: center;
`;
const QR = styled.img`
  cursor: pointer;
  position: absolute;
  width: 50px;
  align-self: center;
`;
class Nav extends React.Component {
  state = {
    dark: false
  };
  DarkMode = e => {
    document.body.style =
      this.state.dark === true
        ? "background-color: white"
        : "background-color: #3C5D74";
    e.target.src = this.state.dark === true ? LightImage : DarkImage;
    this.setState({
      dark: !this.state.dark
    });
  };
  changePage = page => {
    if (page === "/logout") {
      logout();
    }
    this.props.history.push(page);
  };
  Logout = () => {
    console.log("logout");
  };
  makeLog = () => {
    if (isLoggedIn()) {
      return (
        <HeaderNav onClick={() => this.changePage("/logout")}>LOGOUT</HeaderNav>
      );
    } else {
      return (
        <HeaderNav onClick={() => this.changePage("/login")}>LOGIN</HeaderNav>
      );
    }
  };
  resize = () => this.forceUpdate();
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  render() {
    if (window.innerWidth < 800) {
      return (
        <NavDiv>
          <Header onClick={() => this.changePage("/home")}>STACK</Header>
          <QR onClick={() => this.changePage("/profile")} src={QRImage} />
        </NavDiv>
      );
    } else {
      return (
        <NavDiv>
          <Header onClick={() => this.changePage("/home")}>STACK</Header>

          <FlexinNav>
            <HeaderNav onClick={() => this.changePage("/add")}>ADD</HeaderNav>
            <HeaderNav onClick={() => this.changePage("/profile")}>
              QR
            </HeaderNav>

            <HeaderNav onClick={() => this.changePage("/edit")}>EDIT</HeaderNav>
            {this.makeLog()}
          </FlexinNav>

          <Dark onClick={this.DarkMode} src={LightImage} />
        </NavDiv>
      );
    }
  }
}
export default withRouter(Nav);
