import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js";
import "./Column.css";

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            initialTasks: this.props.tasks,
            tasks:[],
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.setState({tasks: this.state.initialTasks});
    }

    handleDelete(id){
        fetch(`/api/v1/tasks/${id}`,
              {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
            .then((response) => {
                this.deleteTask(id);
            });
    }

    deleteTask(task_id){
        let tasks = this.state.tasks.filter((task) => task.id != task_id);
        this.setState({
            tasks: tasks
        });
    }

    render () {
        return (
            <div className="Column">
              <div className="ColumnHeader">
                <small className="HeaderName text-primary">{this.props.name}</small>
                <button className="HeaderButton btn btn-sm btn-outline-primary" onClick={() => this.props.handleCreate(this.props.id)}>
                  <i className="fas fa-bolt"></i>
                </button>
              </div>
	      <div className="ColumnContent">
            {this.props.tasks.map(task =>
                                  <Card key={task.id}
                                        id={task.id}
                                        name={task.name}
                                        description={task.description}
                                        created_at={task.created_at}
                                        column_id={this.props.id}
                                        handleDelete={this.handleDelete}
                                        handleCopy={this.props.handleCopy} />
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
