import React from "react";
import styled from "styled-components";
import Card from "../BusCard/Card";
import BannerImage from "./banner.png";
import { handleGetQR, getUser } from "../withAuth/services";
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
  getQRCode = async jwt => {
    console.log(jwt);
    let qr = await handleGetQR(jwt.subject);
    console.log(qr);
    this.setState({
      qr: qr.qrcode
    });
  };
  componentDidMount = () => {
    this.parseJwt();
  };
  parseJwt = () => {
    console.log(getUser().token);
    let token = getUser();
    var base64Url = token.token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    this.getQRCode(JSON.parse(jsonPayload));
  };
  render() {
    return (
      <Home>
        <Banner src={this.state.qr} />
      </Home>
    );
  }
}
