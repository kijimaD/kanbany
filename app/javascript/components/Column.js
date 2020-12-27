import React from "react"
import PropTypes from "prop-types"
class Column extends React.Component {
  render () {
    return (
      <React.Fragment>
        Description: {this.props.description}
      </React.Fragment>
    );
  }
}

Column.propTypes = {
  description: PropTypes.string
};
export default Column
