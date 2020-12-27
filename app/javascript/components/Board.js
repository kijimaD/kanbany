import React from "react"
import PropTypes from "prop-types"
class Board extends React.Component {
  render () {
    return (
      <div className="Board">
        Board Description: {this.props.description}
      </div>
    );
  }
}

Board.propTypes = {
  description: PropTypes.string
};
export default Board
