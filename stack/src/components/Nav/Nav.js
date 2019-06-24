import React from "react";
import styled from "styled-components";
import "./Nav.css";
const NavDiv = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2477b3;
  display: flex;
  justify-content: center;
`;
const Header = styled.h1`
  margin: 0px;
  padding: 0px;
  color: white;
`;

export default class Nav extends React.Component {
  render() {
    if (window.innerWidth < 500) {
      return (
        <NavDiv>
          <Header>STACK</Header>
        </NavDiv>
      );
    } else {
      return <NavDiv />;
    }
  }
}
