import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js";
import "./Column.css";

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = {initialTasks: this.props.tasks, tasks:[]};
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount(){
        this.setState({tasks: this.state.initialTasks});
    }

    deleteTask(id){
        let tasks = this.state.tasks.filter((task) => task.id != id);
        this.setState({
            tasks: tasks
        });
    }

    addTask(task){
        this.setState({
            tasks: this.state.tasks.concat(task)
        });
    }

    handleCreate(column_id){
        let body = JSON.stringify({
            task: {
                column_id: column_id,
            }
        });
        fetch(`/api/v1/tasks`,
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              })
            .then((response) => {return response.json();})
            .then((task) => {
                this.addTask(task);
        });
    }

    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName">{this.props.name}</small>
                <button className="HeaderButton btn btn-sm btn-outline-primary" onClick={() => this.handleCreate(this.props.id)}>↓</button>
              </div>
	      <div className="ColumnContent">
            {this.state.tasks.map(task =>
                                  <Card id={task.id}
                                        name={task.name}
                                        description={task.description}
                                        created_at={task.created_at}
                                        deleteTask={this.deleteTask.bind(this)}/>
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
