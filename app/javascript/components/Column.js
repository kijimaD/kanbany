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
                  <input type="text" value={this.props.column.name} placeholder="Column Title" onChange={e=>this.props.handleColumnChange(e, "name", this.props.column)} className="mb-0 pb-0 h3" />
                <button className="btn btn-sm text-primary px-0 float-right" onClick={() => this.props.handleCreate(this.props.column.id)} tabIndex="-1">
                  <span className="material-icons">
                    add
                  </span>
                </button>
                {this.props.settingMode &&
                 <span className="btn btn-sm px-0 material-icons transform float-right" {...this.props.provided.dragHandleProps}>
                   drag_indicator
                 </span>
                }
                {!this.props.settingMode &&
                 <span className="btn btn-sm px-0 material-icons transform float-right" {...this.props.provided.dragHandleProps} style={{display: 'none'}}>
                   drag_indicator
                 </span>
                }
                {this.props.settingMode &&
                 <button className="btn btn-sm px-0 text-danger float-right" onClick={() => this.props.handleColumnDelete(this.props.column.id)} tabIndex="-1" >
                   <span className="material-icons">
                     clear
                   </span>
                 </button>
                }

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
                                                      {...provided.dragHandleProps}
                                                      tabIndex="-1">
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
