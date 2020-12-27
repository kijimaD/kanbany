import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js"
import "./Column.css";

class Column extends React.Component {
  render () {
    return (
      <div className="Column">
        Column: {this.props.description}
	<Card description="kanbany"/>
      </div>
    );
  }
}

Column.propTypes = {
  description: PropTypes.string
};
export default Column
