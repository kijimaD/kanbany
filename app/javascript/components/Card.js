import React from "react"
import PropTypes from "prop-types"
class Card extends React.Component {
  render () {
    return (
      <React.Fragment>
        Description: {this.props.description}
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  description: PropTypes.string
};
export default Card
