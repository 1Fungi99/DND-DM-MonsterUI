import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    monsterQueryChange: "",
    monsterQuery: "",

    //Monster Name
    monsterName: "",

    //Ability Score
    monsterSTR: "",
    monsterDEX: "",
    monsterCON: "",
    monsterINT: "",
    monsterWIS: "",
    monsterCHA: "",

    //Monster AC
    monsterAC: ""
  };

  handleChange = event => {
    this.setState({ monsterQueryChange: event.target.value });
    console.log(event.target.value);
  };

  baseURL = "http://www.dnd5eapi.co/api/monsters/";

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ monsterQuery: this.state.monsterQueryChange });
    // console.log("Monster Query: " + this.state.monsterQuery);
    axios
      .get(this.baseURL + this.state.monsterQueryChange.toLowerCase())
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
      monsterCHA: data.charisma
    });
    console.log(this.state);
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

        <div className="container monsterContainer">
          <h3>Searched Monster:</h3>
        </div>
      </>
    );
  }
}
