import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js";
import "./Column.css";

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = {initialTasks: this.props.tasks, tasks:[]};
    }

    componentDidMount(){
        this.setState({tasks: this.state.initialTasks});
    }

    deleteList(id){
        let tasks = this.state.tasks.filter((list) => task.id != id);
        this.setState({
            tasks: tasks
})}

    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName">{this.props.name}</small>
                <button className="HeaderButton btn btn-sm btn-outline-primary">↓</button>
              </div>
	      <div className="ColumnContent">
            {this.state.tasks.map(task =>
                                  <Card id={task.id}
                                        name={task.name}
                                        description={task.description}
                                        created_at={task.created_at} />
                                   )}
              </div>
            </div>
        );
    }
}

Column.propTypes = {
    name: PropTypes.string
};
export default Column;
