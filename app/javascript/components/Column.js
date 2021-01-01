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
    }

    componentDidMount(){
        this.setState({tasks: this.state.initialTasks});
    }

    render () {
        return (
	    <div className="Column">
	      <div className="ColumnHeader">
                <small className="HeaderName text-primary">{this.props.name}</small>
                <button className="HeaderButton btn btn-sm btn-outline-secondary" onClick={() => this.props.handleCreate(this.props.id)}>
                  <i className="fas fa-bolt"></i>
                  <span className="material-icons">
                    flash_on
                  </span>
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
                                            handleCreate={this.props.handleCreate}
                                            handleDelete={this.props.handleDelete}
                                            handleChange={this.props.handleChange}
                                            handleValueChange={this.props.handleValueChange}
                                      />

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
