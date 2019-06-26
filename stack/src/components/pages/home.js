import React from "react";
import styled from "styled-components";
import Card from "../BusCard/Card";
import BannerImage from "./banner.png";
import { getUser } from "../withAuth/services";
const axios = require("axios");
const Home = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    flex-flow: column;
  }
`;
const Banner = styled.img`
  margin: 25px 0px;
  width: 500px;
  @media (max-width: 500px) {
    width: 95%;
  }
`;
export default class HomePage extends React.Component {
  state = {
    cards: []
  };
  UpdateCards = () => {
    let user = getUser();
    console.log(user);
    axios
      .get(`https://bw-business-card-org-be-raine.herokuapp.com/api/cards`, {
        headers: { Authorization: `${user.token}` }
      })
      .then(res => {
        this.setState({
          cards: res.data
        });
      });
  };
  componentDidMount = () => {
    let user = getUser();
    console.log(user);
    axios
      .get(`https://bw-business-card-org-be-raine.herokuapp.com/api/cards`, {
        headers: { Authorization: `${user.token}` }
      })
      .then(res => {
        this.setState({
          cards: res.data
        });
      });
  };
  makeCards = () => {
    let { cards } = this.state;
    if (cards) {
      return cards.map(card => {
        return (
          <Card
            name={card.businessName}
            address={card.address}
            number={card.phone}
            notes={card.notes}
            id={card.id}
            cb={this.UpdateCards}
          />
        );
      });
    }
  };
  render() {
    return (
      <Home>
        <Cards>{this.makeCards()}</Cards>
      </Home>
    );
  }
}
