import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js"
import "./Column.css";

class Column extends React.Component {
    constructor(props){
        super(props)
        this.state = {initialTasks: this.props.tasks, tasks:[]}
    }

    componentDidMount() {
        this.setState({tasks: this.state.initialTasks})
    }

    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName">{this.props.name}</small>
                <button className="HeaderButton btn btn-outline-primary">+</button>
              </div>
              <div className="ColumnContent">
	        <Card name="task" description="p10-20" />
              </div>
            </div>
        );
    }
}

Column.propTypes = {
    name: PropTypes.string
};
export default Column
