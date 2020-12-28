import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js"
import "./Column.css";

class Column extends React.Component {
    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName">{this.props.description}</small>
                <button className="HeaderButton btn btn-outline-primary">+</button>
              </div>
              <div className="ColumnContent">
              </div>
	      <Card description="kanbany"/>
            </div>
        );
    }
}

Column.propTypes = {
    description: PropTypes.string
};
export default Column
