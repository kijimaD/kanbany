import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js"
import "./Column.css";

class Column extends React.Component {
    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName">{this.props.name}</small>
                <button className="HeaderButton btn btn-outline-primary">+</button>
              </div>
              <div className="ColumnContent">
              </div>
	      <Card name="kanbany"/>
            </div>
        );
    }
}

Column.propTypes = {
    name: PropTypes.string
};
export default Column
