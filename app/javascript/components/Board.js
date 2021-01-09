import React from "react";
import PropTypes from "prop-types";
import Column from "./Column";
import "./Board.css";
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            columns: [],
        };

        // Column
        this.handleColumnChange = this.handleColumnChange.bind(this);
        this.handleColumnDelete = this.handleColumnDelete.bind(this);
        this.handleOnDragEndColumn = this.handleOnDragEndColumn.bind(this);
        // Task ----------
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleOnDragEndTask = this.handleOnDragEndTask.bind(this);
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
            .then((response) => {return response.json()})
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

    handleColumnUpdate(column){
        var body = JSON.stringify({
            column: column
        });
        fetch(`/api/v1/columns/${column.id}`,
              {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              });
    }

    handleColumnChange(e, key, arg_column){
        var target = e.target;
	var value = target.value;

        var columns = [...this.state.columns];

        columns.map(function(column){
            if(column.id === arg_column.id) {
                column[key] = value;
            }
        });

        this.setState({
            columns: columns
        });
        this.handleColumnUpdate(arg_column);
    }

    handleColumnDelete(id){
        let check = window.confirm('Are you sure you want to delete the column?');
        if (check){
            fetch(`/api/v1/columns/${id}`,
                  {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  })
	        .then((response) => {
		    this.deleteColumn(id);
	        });
        }
    }

    deleteColumn(id){
        var columns = [...this.state.columns];
	columns = columns.filter((column) => column.id != id);

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
		return value;
	    } catch(f) {
		return e;
	    }
            return "error";	// This line is for syntax checker
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

    handleUpdate(task) {
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

    handleOnDragEndColumn(result) {
        // if (!result.destination) return;

        // const column_id = parseInt(result.draggableId.split("-")[0]);
	// var columns = [...this.state.columns];

	// const [reorderedColumn] = columns.splice(result.source.index, 1);
        // columns.splice(result.destination.index, 0, reorderedColumn);

        // this.setState({
        //     columns: columns
        // });
        // this.updateColumnRank(column_id, result.destination.index);
    }

    updateColumnRank(column_id, index) {
        let body = JSON.stringify({
            column: { row_order_position: index }
        });
        fetch(`/api/v1/columns/${column_id}`,
              {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              });
    }

    handleOnDragEndTask(result) {
        if (!result.destination) return;

        const column_id = parseInt(result.draggableId.split("-")[0]);
        const task_id = parseInt(result.draggableId.split("-")[1]);
	var columns = [...this.state.columns];

	columns.map(function(column){
	    if(column.id === column_id) {
		const [reorderedItem] = column.tasks.splice(result.source.index, 1); // Get tesk
                column.tasks.splice(result.destination.index, 0, reorderedItem); // Add
	    }
	});

        this.setState({
            columns: columns
        });
        this.updateTaskRank(task_id, result.destination.index);
    }

    updateTaskRank(task_id, index) {
        let body = JSON.stringify({
            task: { row_order_position: index }
        });
        fetch(`/api/v1/tasks/${task_id}`,
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

        const getListStyle = isDraggingOver => ({
            display: 'flex',
            padding: grid,
            overflow: 'auto',
        });

        const grid = 8;

        return (
	    <div className="Board">
              <DragDropContext onDragEnd={this.handleOnDragEndColumn}>
                <Droppable droppableId="column" type="column" direction="horizontal">
                  {(provided, snapshot) => (
                      <ul
                        className="columns"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
	                {this.state.columns.map((column, index) =>
                                                <Draggable
                                                  key={column.id}
                                                  draggableId={ String(column.id) }
                                                  index={index}>
                                                  {(provided, snapshot) => (
                                                      <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}>
                                                        <span {...provided.dragHandleProps}
                                                              style={{
                                                                  border: "1px solid black"
                                                              }}
                                                        >
                                                          Drag
                                                        </span>
				                        <Column
				                          key={column.id}
				                          column={column}
				                          tasks={column.tasks}
                                                          handleColumnChange={this.handleColumnChange}
                                                          handleColumnDelete={this.handleColumnDelete}
				                          handleCreate={this.handleCreate}
                                                          handleDelete={this.handleDelete}
				                          handleInputChange={this.handleInputChange}
				                          handleMove={this.handleMove}
                                                          handleOnDragEndTask={this.handleOnDragEndTask}
				                        />
                                                      </li>
                                                  )}
                                                </Draggable>
                                               )}
                        {provided.placeholder}
                      </ul>
                  )}
                </Droppable>
              </DragDropContext>
	      <button className="btn btn-outline-primary float-right" onClick={() => this.handleColumnCreate(this.state.columns[0].board_id)}>+</button>
	    </div>
        );
    }
}

Board.propTypes = {
    name: PropTypes.string,
};
export default Board;
