import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { handleEditCard, handleGetCards } from "../withAuth/services";
import styled from "styled-components";
import PhoneInput from "react-phone-input-auto-format";

const EditForm = styled.div`
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
const Select = styled.select`
  margin: 25px;
  width: 50%;
  height: 25px;
  border: none;
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

class Edit extends React.Component {
  state = {
    cards: null,
    activeCard: {
      businessName: "",
      address: "",
      phone: "",
      logoPic: "",
      additionalPic: "",
      phone2: "",
      blurb: "",
      hours: "",
      email: "",
      website: "",
      notes: ""
    },
    add: false,
    businessName: "",
    address: "",
    phone: "",
    logoPic: "",
    additionalPic: "",
    phone2: "",
    blurb: "",
    hours: "",
    email: "",
    website: "",
    notes: ""
  };
  Login = async () => {
    const {
      activeCard,
      businessName,
      address,
      phone,
      logoPic,
      additionalPic,
      phone2,
      blurb,
      hours,
      email,
      website,
      notes
    } = this.state;
    let id = activeCard.id;
    if (businessName.length > 0 && address.length > 0 && phone.length > 0) {
      let add = await handleEditCard({
        id,
        businessName,
        address,
        phone,
        logoPic,
        additionalPic,
        phone2,
        blurb,
        hours,
        email,
        website,
        notes
      });
      console.log(add);
      if (add === true) {
        this.props.history.push("/home");
      }
    }
  };
  textFormHandler = e => {
    if (e.target) {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        phone: e
      });
    }
  };
  getCards = async () => {
    let cards = await handleGetCards();
    this.setState({
      cards: cards
    });
  };
  findCard = e => {
    let { cards } = this.state;
    if (cards) {
      let id = e.target.value;

      let Card = cards.filter(card => {
        return card.id.toString() === id.toString();
      });
      let activeCard = Card[0];
      if (activeCard) {
        this.setState({
          activeCard: activeCard,
          businessName: activeCard.businessName,
          address: activeCard.address,
          phone: activeCard.phone,
          logoPic: activeCard.logoPic,
          additionalPic: activeCard.additionalPic,
          phone2: activeCard.phone2,
          blurb: activeCard.blurb,
          hours: activeCard.hours,
          email: activeCard.email,
          website: activeCard.website,
          notes: activeCard.notes
        });
      }
    }
  };
  makeOptions = () => {
    let { cards } = this.state;
    if (cards) {
      return cards.map(card => {
        return <option value={card.id}>{card.businessName}</option>;
      });
    }
  };
  componentDidMount = () => {
    this.getCards();
  };
  render() {
    return (
      <EditForm>
        <HeaderBack>
          <Header>Edit your cards</Header>
        </HeaderBack>

        <Select onChange={this.findCard}>
          <option value="-1">None selected</option>
          {this.makeOptions()}
        </Select>
        <TextInput
          type="text"
          name="businessName"
          placeholder="business Name"
          value={this.state.businessName}
          onChange={this.textFormHandler}
        />
        <TextInput
          type="text"
          name="address"
          placeholder="Address"
          value={this.state.address}
          onChange={this.textFormHandler}
        />
        <PhoneInput
          name="phone"
          placeholder="phone number"
          value={this.state.phone}
          onChange={this.textFormHandler}
          inputComponent={TextInput}
        />
        <TextInput
          type="text"
          name="notes"
          placeholder="notes"
          value={this.state.notes}
          onChange={this.textFormHandler}
        />
        <Button onClick={this.Login}>Edit Card</Button>
      </EditForm>
    );
  }
}

export default withRouter(Edit);
