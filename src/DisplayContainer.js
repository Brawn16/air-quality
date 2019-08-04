import React, { Component } from "react";
import "./displayContainer.css";
import DisplayCard from "./displayCard";

export default class DisplayContainer extends Component {
  render() {
    const { results, removeDisplayCard } = this.props;

    return (
      <div className="displayContainer">
        {results.map((location,i) => {
          return <DisplayCard removeDisplayCard={removeDisplayCard} locationData={location} key={i}/>;
        })}
      </div>
    );
  }
}
