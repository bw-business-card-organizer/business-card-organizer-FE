import React from "react";
import styled from "styled-components";
import Card from "../BusCard/Card";
import BannerImage from "./banner.png";
import { handleGetCard } from "../withAuth/services";
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
    card: {
      businessName: "",
      address: "",
      number: "",
      notes: "",
      id: "",
      cb: ""
    }
  };
  UpdateCards = async id => {
    let cards = await handleGetCard(id);
    console.log(cards);
    this.setState({
      card: cards
    });
  };
  componentDidMount = () => {
    console.log(this.props.match.params.id);
    this.UpdateCards(this.props.match.params.id);
  };

  render() {
    return (
      <Home>
        <Card
          name={this.state.card.businessName}
          address={this.state.card.address}
          number={this.state.card.phone}
          notes={this.state.card.notes}
          id={this.state.card.id}
          cb={this.UpdateCards}
        />
      </Home>
    );
  }
}
