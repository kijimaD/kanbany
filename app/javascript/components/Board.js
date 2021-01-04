import React from "react";
import PropTypes from "prop-types";
import Column from "./Column";
import "./Board.css";
import moment from 'moment';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            columns: [],
        };

        this.handleColumnCreate = this.handleColumnCreate.bind(this);

        // Task ----------
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        columns: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    // Column ----------
    handleColumnCreate(board_id, name=""){
        let body = JSON.stringify({
            column: {
                board_id: board_id,
                name: name,
            }
        });
        fetch(`/api/v1/columns`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        })
            .then((response) => {return response.json();})
            .then((column) => {
                this.addColumn(column, board_id);
            });
    }

    addColumn(column, board_id){
        var columns = [...this.state.columns];
        column.tasks = [];
        columns.push(column);

        this.setState({
            columns: columns
        });
    }

    // Task ----------
    handleCreate(column_id, name="", color="black", moved_at=moment().format()){
        let body = JSON.stringify({
            task: {
                column_id: column_id,
		name: name,
		color: color,
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
                this.addTask(task, column_id);
            });
    }

    addTask(task, column_id){
        var columns = [...this.state.columns];
        columns.map(function(column){
            if(column.id === column_id) {
                column.tasks = column.tasks.concat(task);
            }
        });

        this.setState({
            columns: columns
        });
    }

    handleDelete(id, column_id){
        fetch(`/api/v1/tasks/${id}`,
              {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
            .then((response) => {
                this.deleteTask(id, column_id);
            });
    }

    deleteTask(task_id, column_id){
        var columns = [...this.state.columns];
        columns.map(function(column){
            if(column.id === column_id) {
		column.tasks = column.tasks.filter((task) => task.id != task_id);
            }
        });

        this.setState({
            columns: columns
        });
    }

    handleMove(key, process_task, value, current_column_id, new_column_id){
	var columns = [...this.state.columns];

	process_task[key] = value;
	process_task['moved_at'] = moment().format();
        columns.map(function(column) {
	    // delete
            if(column.id === current_column_id) {
		column.tasks = column.tasks.filter((task) => task.id != process_task.id);
            }

	    // add
	    if(column.id === new_column_id) {
 		column.tasks = column.tasks.concat(process_task);
	    }
	});

        this.setState({
            columns: columns
        });

	this.handleUpdate(process_task);
    }

    handleInputChange(e, key, process_task){
	function get() {
	    try {
		var target = e.target;
		var value = target.value;
		return value
	    } catch {
		return e
	    }
        }

	var value = get();

	var columns = [...this.state.columns];

	columns.map(function(column){
	    if(column.id === process_task.column_id) {
		column.tasks.map(function(task){
		    if(task.id === process_task.id) {
			task[key] = value;
		    }
		});
	    }
	});

        this.setState({
            columns: columns
        });

	this.handleUpdate(process_task);
    }

    handleUpdate(task){
        let body = JSON.stringify({
	    task: task
	});
        fetch(`/api/v1/tasks/${task.id}`,
              {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              });
    }

    render () {
        const { error, columns } = this.state;
        return (
	    <div className="Board">
	      {this.state.columns.map(column =>
				      <Column key={column.id}
				              column={column}
					      tasks={column.tasks}
					      handleCreate={this.handleCreate}
                                              handleDelete={this.handleDelete}
					      handleInputChange={this.handleInputChange}
					      handleMove={this.handleMove}
				      />
                                     )}
	      <button className="btn btn-outline-primary float-right" onClick={() => this.handleColumnCreate(this.state.columns[0].board_id)}>+</button>
            </div>
        );
    }
}

Board.propTypes = {
    name: PropTypes.string,
};
export default Board;
