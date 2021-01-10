import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js";
import "./Column.css";
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class Column extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
	    <div className="Column">
	      <div className="ColumnHeader">
                <small>
                  <input type="text" value={this.props.column.name} placeholder="Column Title" onChange={e=>this.props.handleColumnChange(e, "name", this.props.column)} className="w-50 mb-0 pb-0" />
                </small>
                <button className="btn btn-sm float-right" onClick={() => this.props.handleColumnDelete(this.props.column.id)} tabIndex="-1" >
                  <span className="material-icons">
                    clear
                  </span>
                </button>
                <button className="btn btn-sm btn-outline-warning float-right border-0" onClick={() => this.props.handleCreate(this.props.column.id)} tabIndex="-1">
                  <span className="material-icons">
                    flash_on
                  </span>
                </button>
	      </div> {/* ColumnHeader */}

	      <div className="ColumnContent">
                <Droppable droppableId={ String(this.props.column.id) } type="card">
                  {(provided, snapshot) => (
                      <ul
                        className="cards"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
		        {this.props.tasks.map((task, index) =>
                                              <Draggable
                                                key={task.id}
                                                draggableId={ String(this.props.column.id) + "-" + String(task.id) }
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <li
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}>
                                                      <Card
                                                        key={task.id}
                                                        task={task}
                                                        handleCreate={this.props.handleCreate}
                                                        handleDelete={this.props.handleDelete}
                                                        handleInputChange={this.props.handleInputChange}
                                                      />
                                                    </li>
                                                )}
                                              </Draggable>
                                             )}
                        {provided.placeholder}
                      </ul>
                  )}
                </Droppable>
              </div> {/* ColumnContent */}
	    </div> // Column
        );
    }
}

Column.propTypes = {
    name: PropTypes.string
};
export default Column;
