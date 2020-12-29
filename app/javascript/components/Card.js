import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js"
import "./Card.css";

class Card extends React.Component {
  render () {
    return (
        <div className="Card">
          <div className="CardHeader">
            {this.props.name}
          </div>
          <div className="CardContent">
            <small>
	      {this.props.description}
	    </small>
            <button className="ContentButton btn btn-sm btn-outline-primary float-right">←</button>
          </div>
          <div className="CardFooter">
            <small className="float-right text-secondary">
              <Time time={this.props.created_at}/>
            </small>
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
