import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

class Time extends React.Component {
    render () {
        const timeString = moment(this.props.time).fromNow();
        return (
	    <span className="text-left px-1">
	      {timeString}
	    </span>
        );
    }
}

Time.propTypes = {
  time: PropTypes.string
};
export default Time
