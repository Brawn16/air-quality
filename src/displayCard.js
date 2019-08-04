import React from "react";
import TimeAgo from "react-timeago";
import "./displayCard.css";

const DisplayCard = ({ locationData, removeDisplayCard }) => {
  const { location, city, measurements } = locationData;

  const displayMeasuremets = values => {
    return values.reduce((acc, value) => {
      return acc.concat(` ${value.parameter.toUpperCase()}:${value.value}`);
    }, "Values:");
  };
  const onClick = () => {
    removeDisplayCard(location)
  }
  return (
    <div className="displayCard">
      <span className="displayCard__lastUpdated">
        {`UPDATED `}{" "}
        <TimeAgo className="timeago" date={measurements[0].lastUpdated} />
      </span>
      <p className="displayCard__locationTitle ">{location}</p>
      <p className="displayCard__city">{`In ${city}, United Kingdom`}</p>
      <span className="displayCard__values">
        {displayMeasuremets(measurements)}
      </span>
      <div className="close" onClick={onClick} />
    </div>
  );
};
export default DisplayCard;
