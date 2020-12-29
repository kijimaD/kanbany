import React from "react"
import PropTypes from "prop-types"
class Time extends React.Component {
  render () {
    return (
      <React.Fragment>
        Time: {this.props.time}
      </React.Fragment>
    );
  }
}

Time.propTypes = {
  time: PropTypes.string
};
export default Time
