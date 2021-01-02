import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js";
import "./Card.css";

class Card extends React.Component {

    constructor(props){
        super(props);
    }

    render () {
        return (
            <div className="Card my-2">
              <small>
                <input type="text" value={this.props.name} placeholder="Title" onChange={e=>this.props.handleChange(e, "name", this.props.id, this.props.column_id)} className="text-right text-secondary" />
              </small>

	      <div className="CardContent" style={{ borderLeftColor: this.props.card.color }}>
                <input type="text" value={this.props.description} placeholder="Description" onChange={e=>this.props.handleChange(e, "description", this.props.id, this.props.column_id)} style={{ borderBottomColor: this.props.card.color}} className="h5 mb-0 pb-0" />

                <div className="container">
                  <div className="row">

                    <div className="col-8 p-0">
                      <small className="text-secondary">
                        <Time time={this.props.created_at}/>
                      </small>
                    </div> {/* col */}

                    <div className="col-4">
                      <div className="dropright drop-hover text-right">
                        <button className="MenuButton btn btn-outline-primary border-0 my-0 py-0" data-toggle="dropdown" tabIndex="-1">
                          <span className="material-icons">
                            layers
                          </span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-primary" onClick={() => this.props.handleCreate(this.props.column_id - 1, this.props.name, this.props.card.color)} tabIndex="-1" >
                              <span className="material-icons transform">
                                account_tree
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-danger" onClick={() => this.props.handleDelete(this.props.id, this.props.column_id)} tabIndex="-1" >
                              <span className="material-icons">
                                delete_sweep
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-secondary" onClick={() => this.props.handleValueChange("column_id", this.props.card, this.props.column_id - 1, this.props.column_id, this.props.column_id - 1)} tabIndex="-1" >
                              <span className="material-icons">
                                keyboard_backspace
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-secondary" onClick={() => this.props.handleValueChange("column_id", this.props.card, this.props.column_id + 1, this.props.column_id, this.props.column_id + 1)} tabIndex="-1" >
                              <span className="material-icons">
                                arrow_right_alt
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-secondary bg-warning text-white" onClick={() => this.props.handleValueChange("color", this.props.card, "#ffc107", this.props.column_id, this.props.column_id)} tabIndex="-1" >
                              <span className="material-icons">
                                format_paint
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-secondary bg-primary text-white" onClick={() => this.props.handleValueChange("color", this.props.card, "#007bff", this.props.column_id, this.props.column_id)} tabIndex="-1" >
                              <span className="material-icons">
                                format_paint
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="ContentButton btn btn-lg btn-outline-secondary bg-danger text-white" onClick={() => this.props.handleValueChange("color", this.props.card, "#dc3545", this.props.column_id, this.props.column_id)} tabIndex="-1" >
                              <span className="material-icons">
                                format_paint
                              </span>
                            </button>
                            <button className="ContentButton btn btn-lg btn-outline-secondary bg-success text-white" onClick={() => this.props.handleValueChange("color", this.props.card, "#28a745", this.props.column_id, this.props.column_id)} tabIndex="-1" >
                              <span className="material-icons">
                                format_paint
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div> {/* dropmenu */}
                    </div> {/* col */}
                  </div> {/* row */}
                </div> {/* container */}

              </div> {/* cardContent */}

            </div> // card
        );
    }
}

Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};
export default Card;
