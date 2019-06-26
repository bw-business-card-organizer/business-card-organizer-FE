import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  handleLogin,
  isLoggedIn,
  handleDeleteCard
} from "../withAuth/services";
import styled from "styled-components";
import "./Card.css";

const Card = styled.div`
  margin: 25px;
  background-color: #3c5c74;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  width: 375px;
  height: 150px;
  box-shadow: 4px 6px 7px 2px rgba(0, 0, 0, 0.75);
  @media (max-width: 500px) {
    width: 95%;
  }
`;
const HeaderBack = styled.div`
padding: 0px 10px;
width: -webkit-fill-available;
  height 50px;
  background-color:#8C8886;
  display:flex;
  justify-content:flex-end
  align-items:center;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Header = styled.h1`
  margin: 0px;
  margin-right: auto;
  padding: 0px;
  color: white;
  width: 280px;
  font-size: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Button = styled.button`
  position: absolute;
  width: 75px;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: #b26c43;
  color: white;
  align-self: center;
`;
const Body = styled.div`
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Content = styled.p`
  margin: 5px;
  color: white;
  text-overflow: ellipsis;
  width: 50%;
  line-height: 1.5;
`;

export default class BusinessCard extends React.Component {
  DeleteHandler = async () => {
    console.log(this.props.id);
    await handleDeleteCard(this.props.id);
    this.props.cb();
  };
  render() {
    return (
      <Card>
        <HeaderBack>
          <Header>{this.props.name}</Header>
          <Button onClick={this.DeleteHandler}>Delete</Button>
        </HeaderBack>
        <Content>Number: {this.props.number}</Content>
        <Body>
          <Content>Address: {this.props.address}</Content>
          <Content>Notes: {this.props.notes}</Content>
        </Body>
      </Card>
    );
  }
}
