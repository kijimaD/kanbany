import React from "react";
import PropTypes from "prop-types";

class MenuColorButton extends React.Component {
    render () {
        return (
            <button className="MenuButton btn btn-lg btn-outline-secondary text-white" onClick={() => this.props.handleInputChange(this.props.color_code, "color", this.props.task)} tabIndex="-1" style={{backgroundColor: this.props.color_code}}>
              <span className="material-icons">
                format_paint
              </span>
            </button>
        );
    }
}

export default MenuColorButton;
