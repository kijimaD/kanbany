import React from "react";
import PropTypes from "prop-types";
import Card from "./Card.js";
import "./Column.css";

class Column extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
	    <div className="Column">
	      <div className="ColumnHeader">
                <small>
                  <input type="text" value={this.props.column.name} placeholder="Column Title" onChange={e=>this.props.handleColumnUpdate(e, "name", this.props.column)} className="w-50 mb-0 pb-0" />
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
		{this.props.tasks.map(task =>
                                      <Card key={task.id}
                                            task={task}
                                            handleCreate={this.props.handleCreate}
                                            handleDelete={this.props.handleDelete}
                                            handleInputChange={this.props.handleInputChange}
                                            handleMove={this.props.handleMove}
                                      />

                                     )}
              </div> {/* ColumnContent */}

	    </div> // Column
        );
    }
}

Column.propTypes = {
    name: PropTypes.string
};
export default Column;
