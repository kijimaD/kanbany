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
          <div className="CardContent">
            {this.props.description}
            <button className="btn btn-sm btn-outline-primary float-right">←</button>
            <button className="btn btn-sm btn-outline-primary float-right">↓</button>
          </div>
      </div>
    );
  }
}

Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};
export default Card
