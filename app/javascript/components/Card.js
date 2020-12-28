import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends React.Component {
  render () {
    return (
        <div className="Card">
          <div className="CardHeader">
            {this.props.description}
          </div>
          <div className="CardHeader">
          </div>
      </div>
    );
  }
}

Card.propTypes = {
  description: PropTypes.string
};
export default Card
