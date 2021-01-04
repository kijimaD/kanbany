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
                <small className="text-dark">{this.props.column.name}</small>
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
