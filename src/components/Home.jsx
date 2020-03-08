import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    monsterQueryChange: "",
    monsterQuery: "",

    //Monster Name
    monsterName: "Search a Monster!",

    //Ability Score
    monsterSTR: "",
    monsterDEX: "",
    monsterCON: "",
    monsterINT: "",
    monsterWIS: "",
    monsterCHA: "",

    //Monster AC
    monsterAC: "",

    //Monster Speed
    monsterSpeed: [],

    monsterHP: "",
    monsterHitDice: "",

    monsterProf: []
  };

  handleChange = event => {
    this.setState({ monsterQueryChange: event.target.value });
    console.log(event.target.value);
  };

  baseURL = "http://www.dnd5eapi.co/api/monsters/";

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      monsterQuery: this.state.monsterQueryChange
        .split(" ")
        .join("-")
        .toLowerCase()
    });
    // console.log("Monster Query: " + this.state.monsterQuery);
    axios
      .get(
        this.baseURL +
          this.state.monsterQueryChange
            .split(" ")
            .join("-")
            .toLowerCase()
      )
      .then(res => {
        const data = res.data;
        console.log(data);
        this.bindData(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  bindData = data => {
    this.setState({
      monsterName: data.name,
      monsterAC: data.armor_class,
      monsterSTR: data.strength,
      monsterDEX: data.dexterity,
      monsterCON: data.constitution,
      monsterINT: data.intelligence,
      monsterWIS: data.wisdom,
      monsterCHA: data.charisma,
      monsterSpeed: data.speed,
      monsterHP: data.hit_points,
      monsterHitDice: data.hit_dice,
      monsterProf: data.proficiencies
    });
    console.log(this.state);
    this.speedData();
    this.profData();
  };

  speedData = () => {
    var speedArray = [];
    for (var key in this.state.monsterSpeed) {
      if (this.state.monsterSpeed.hasOwnProperty(key)) {
        speedArray.push(key + ": " + this.state.monsterSpeed[key]);
      }
    }
    speedArray = speedArray.join(" , ");
    return <h5>Speed: {speedArray}</h5>;
  };

  profData = () => {
    var profArray = [];
    for (var i = 0; i < this.state.monsterProf.length; i++) {
      for (var key in this.state.monsterProf[i]) {
        if (this.state.monsterProf[i].hasOwnProperty(key)) {
          profArray.push(key + ": " + this.state.monsterProf[i][key]);
        }
      }
    }
    // profArray.filter();
    console.log(profArray);
  };

  // profFilter = () =>{
  //   return( if (!profArray.includes("url:"))
  //   )
  // }

  render() {
    return (
      <>
        <div className="container headerContainer">
          <h1 className="header">Dungeons and Dragons 5e Monster Manual</h1>
          <h2 className="headerText">Search any monster by name!</h2>
        </div>
        <div className="container inputContainer">
          <form>
            <label>
              Monster:
              <br />
              <input
                type="text"
                name="monsterName"
                placeholder="Monser Name"
                onChange={this.handleChange}
              />
            </label>
            <button
              className="button btn-primary"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>

        <div className="container monsterContainer">
          <h3>Searched Monster:</h3>
          <h4 className="align-left">{this.state.monsterName}</h4>
          <div className="row">
            <div className="col-sm-5 align-left">
              <h5>Hit Points: {this.state.monsterHP}</h5>
              <h5>Hit Die: {this.state.monsterHitDice}</h5>
              <h5>Armor Class: {this.state.monsterAC}</h5>
              <this.speedData />
              <div className="row">
                <h5 className="row-spacing">STR</h5>
                <h5 className="row-spacing">DEX</h5>
                <h5 className="row-spacing">CON</h5>
                <h5 className="row-spacing">INT</h5>
                <h5 className="row-spacing">WIS</h5>
                <h5 className="row-spacing">CHA</h5>
              </div>
              <div className="row">
                <h5 className="row-spacing">{this.state.monsterSTR}</h5>
                <h5 className="row-spacing">{this.state.monsterDEX}</h5>
                <h5 className="row-spacing">{this.state.monsterCON}</h5>
                <h5 className="row-spacing">{this.state.monsterINT}</h5>
                <h5 className="row-spacing">{this.state.monsterWIS}</h5>
                <h5 className="row-spacing">{this.state.monsterCHA}</h5>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
