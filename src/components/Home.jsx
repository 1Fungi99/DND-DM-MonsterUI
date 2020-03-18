import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    monsterQueryChange: "",
    monsterQuery: "",

    //checks if user searched for a monster
    searched: false,

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

    monsterProf: [],
    SavingThrowArray: [],
    SkillArray: [],
    complete: false
  };

  handleChange = event => {
    this.setState({ monsterQueryChange: event.target.value });
  };

  baseURL = "http://www.dnd5eapi.co/api/monsters/";

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      monsterQuery: this.state.monsterQueryChange
        .split(" ")
        .join("-")
        .toLowerCase(),
      monsterName: "",
      monsterAC: "",
      monsterSTR: "",
      monsterDEX: "",
      monsterCON: "",
      monsterINT: "",
      monsterWIS: "",
      monsterCHA: "",
      monsterSpeed: "",
      monsterHP: "",
      monsterHitDice: "",
      monsterProf: "",
      complete: false,
      searched: false
    });
    axios
      .get(
        this.baseURL +
          this.state.monsterQueryChange
            .split(" ")
            .join("-")
            .toLowerCase()
      )
      .then(res => {
        // Displays pulled data; good for file structure
        //================================================
        const data = res.data;
        console.log(data);
        //================================================

        this.bindData(data);
        this.setState({ searched: true });
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
    this.speedData();
    this.profData();
  };

  //Speed data fixing
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
    //Declaring variables for later use
    //================================================
    var profArray = [];
    var prof = [];
    var profFinal = [];
    //================================================
    for (var i = 0; i < this.state.monsterProf.length; i++) {
      for (var key in this.state.monsterProf[i]) {
        if (this.state.monsterProf[i].hasOwnProperty(key)) {
          profArray.push(key + ": " + this.state.monsterProf[i][key]);
        }
      }
    }

    // Loop that takes out any element with url as a key
    for (var j = 0; j < profArray.length; j++) {
      var n = profArray[j].includes("url");
      if (n === true) {
        profArray.splice(j, 1);
      }
    }

    for (var h = 0; h < profArray.length / 2; h++) {
      var base = h * 2;
      var basePlus = base + 1;
      prof.push(profArray[base] + " " + profArray[basePlus]);
    }
    for (var k = 0; k < prof.length; k++) {
      profArray = prof[k].split(" ");
      for (var p = 0; p < profArray.length; p++) {
        var profArrayIndex = profArray[p];
        //checking to see if array has the values of "name: or value:"
        //================================================
        var m = profArrayIndex.includes("name:");
        var z = profArrayIndex.includes("value:");
        if (m === true) {
          this.remove(p, profArray);
        }
        if (z === true) {
          this.remove(p, profArray);
        }
        //================================================
      }
      profFinal.push(profArray.join(" ") + "+");
    }
    var profDisplay = [];
    for (var x = 0; x < profFinal.length; x++) {
      profDisplay.push(profFinal[x]);
    }
    this.setState({
      monsterProf: profDisplay,
      complete: true
    });

    // Loop to shorten Saving Throws
    //===========================================================
    var SavingThrowTemp = [];
    var SkillTemp = [];
    // console.log(this.state.monsterProf);
    for (i = 0; i < this.state.monsterProf.length; i++) {
      if (this.state.monsterProf[i].includes("Skill: ")) {
        var preSkill = this.state.monsterProf[i].split(" ");
        preSkill.splice(0, 1);
        var Skill = preSkill.join(" ");
        SkillTemp.push(Skill);
      }
      if (this.state.monsterProf[i].includes("Saving Throw: ")) {
        var preSavingThrow = this.state.monsterProf[i].split(" ");
        preSavingThrow.splice(0, 2);
        var SavingThrow = preSavingThrow.join(" ");
        SavingThrowTemp.push(SavingThrow);
      }
    }
    this.setState({
      SavingThrowArray: SavingThrowTemp.join(", "),
      SkillArray: SkillTemp.join(", ")
    });
    //===========================================================
  };

  profRender = () => {
    if (!this.state.complete) {
      return null;
    } else {
      return (
        <>
          <h5>Saving Throw: {this.state.SavingThrowArray}</h5>
          <h5>Skill: {this.state.SkillArray}</h5>
        </>
      );
      // return this.state.monsterProf;
    }
  };
  remove = (p, profArray) => {
    profArray.splice(p, 1);
  };

  searched = () => {
    if (this.state.searched) {
      return (
        <div className="container monsterContainer">
          <h3>Searched Monster:</h3>
          <h4 className="align-left">{this.state.monsterName}</h4>
          <div className="row">
            <div className="col-sm-5 align-left">
              <h5>Hit Points: {this.state.monsterHP}</h5>
              <h5>Hit Die: {this.state.monsterHitDice}</h5>
              <h5>Armor Class: {this.state.monsterAC}</h5>
              <this.speedData />
              <div className="row ABNames">
                <h5 className="row-spacing">STR</h5>
                <h5 className="row-spacing">DEX</h5>
                <h5 className="row-spacing">CON</h5>
                <h5 className="row-spacing">INT</h5>
                <h5 className="row-spacing">WIS</h5>
                <h5 className="row-spacing">CHA</h5>
              </div>
              <div className="row ABNumbers">
                <h5 className="row-spacing">{this.state.monsterSTR}</h5>
                <h5 className="row-spacing">{this.state.monsterDEX}</h5>
                <h5 className="row-spacing">{this.state.monsterCON}</h5>
                <h5 className="row-spacing">{this.state.monsterINT}</h5>
                <h5 className="row-spacing">{this.state.monsterWIS}</h5>
                <h5 className="row-spacing">{this.state.monsterCHA}</h5>
              </div>
              <div>
                {/*  Div for Proficiencies */}
                <this.profRender />
              </div>
            </div>
            <div className="col-sm-5 align-left"></div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

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

        <this.searched />
      </>
    );
  }
}
