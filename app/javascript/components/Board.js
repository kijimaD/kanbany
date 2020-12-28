import React from "react"
import PropTypes from "prop-types"
import Column from "./Column";
import "./Board.css";

class Board extends React.Component {
  render () {
    return (
        <div className="Board">
          <Column description="Done"/>
          <Column description="Day"/>
          <Column description="Month"/>
          <Column description="Someday"/>
        </div>
    );
  }
}

Board.propTypes = {
    description: PropTypes.string
};
export default Board
