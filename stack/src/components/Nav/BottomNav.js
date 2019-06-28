import React from "react";
import styled from "styled-components";
import "./Nav.css";
import DarkImage from "./dark.png";
import LightImage from "./light.png";
import { logout, isLoggedIn } from "../withAuth/services";
import EditImage from "./edit.png";
import AddImage from "./add.png";
import HomeImage from "./home.png";
import ShutdownImage from "./shutdown.png";
import { withRouter } from "react-router-dom";
const NavDiv = styled.div`
  position: fixed;
  margin-top 10px;
  bottom: 0px;
  width: -webkit-fill-available;
  height: 60px;
  background-color: #4a7cfa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.75);
`;
const FlexinNav = styled.div`
  cursor: pointer;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.5px black solid;
  border-right: 0.5px black solid;
`;
const UI = styled.img`
  width: 40px;
  height: 40px;
  user-select: none;
`;
class Nav extends React.Component {
  state = {
    dark: LightImage
  };
  DarkMode = e => {
    if (this.state.dark === DarkImage) {
      document.body.style = "background-color: white";
      this.setState({
        dark: LightImage
      });
    } else {
      document.body.style = "background-color: #3C5D74";

      this.setState({
        dark: DarkImage
      });
    }
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
  resize = () => this.forceUpdate();
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  makeLog = () => {
    if (isLoggedIn()) {
      return (
        <FlexinNav onClick={() => this.changePage("/logout")}>
          <UI src={ShutdownImage} />
        </FlexinNav>
      );
    } else {
      return (
        <FlexinNav onClick={() => this.changePage("/login")}>
          <UI src={ShutdownImage} />
        </FlexinNav>
      );
    }
  };
  render() {
    if (window.innerWidth < 800) {
      return (
        <NavDiv>
          <FlexinNav onClick={() => this.changePage("/add")}>
            <UI src={AddImage} />
          </FlexinNav>
          <FlexinNav onClick={() => this.changePage("/edit")}>
            <UI src={EditImage} />
          </FlexinNav>
          <FlexinNav onClick={() => this.changePage("/home")}>
            <UI src={HomeImage} />
          </FlexinNav>
          {this.makeLog()}
          <FlexinNav onClick={this.DarkMode}>
            <UI src={this.state.dark} />
          </FlexinNav>
        </NavDiv>
      );
    } else {
      return <div />;
    }
  }
}
export default withRouter(Nav);
