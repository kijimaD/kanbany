import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends React.Component {
  render () {
    return (
        <div className="Card">
          <div className="CardHeader">
            {this.props.name}
          </div>
          <div className="CardHeader">
          </div>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string
};
export default Card
