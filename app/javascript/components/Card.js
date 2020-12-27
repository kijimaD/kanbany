import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends React.Component {
  render () {
    return (
      <div className="Card">
        Card: {this.props.description}
      </div>
    );
  }
}

Card.propTypes = {
  description: PropTypes.string
};
export default Card
