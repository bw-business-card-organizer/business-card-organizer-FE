import React from "react";
import styled from "styled-components";
import Card from "../BusCard/Card";
import BannerImage from "./banner.png";
import { handleGetQR } from "../withAuth/services";
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
  margin: auto;
  margin-top: 25px;
`;
export default class HomePage extends React.Component {
  state = {
    cards: []
  };
  getQRCode = async () => {
    let qr = await handleGetQR(1);
    console.log(qr);
    this.setState({
      qr: qr.qrcode
    });
  };
  componentDidMount = () => {
    this.getQRCode();
  };
  render() {
    return (
      <Home>
        <Banner src={this.state.qr} />
      </Home>
    );
  }
}
