import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js";
import "./Card.css";

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    moveHorizon(i) {
        this.props.handleMove("column_id",
                                     this.props.card,
                                     this.props.card.column_id + i,
                                     this.props.card.column_id,
                                     this.props.card.column_id + i);
    }

    render () {
        return (
            <div className="Card my-2">
              <small>
                <input type="text" value={this.props.card.name} placeholder="Title" onChange={e=>this.props.handleInputChange(e, "name", this.props.card.name)} className="text-right text-secondary" />
              </small>

              <input type="text" value={this.props.description} placeholder="Description" onChange={e=>this.props.handleInputChange(e, "description", this.props.card)} className="Description h5 mb-0 pb-0" style={{ borderBottomColor: this.props.card.color }}/>

              <div className="container">
                <div className="row">

                  <div className="col-8 p-0">
                    <small className="text-secondary">
                      <Time time={this.props.card.moved_at}/>
                    </small>
                  </div> {/* col */}

                  <div className="col-4 p-0">
                    <div className="dropright drop-hover text-right">
                      <button className="btn btn-outline-warning border-0 my-0 pr-0 text-dark" data-toggle="dropdown" tabIndex="-1">
                        <span className="material-icons">
                          layers
                        </span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="btn btn-lg btn-outline-primary" onClick={() => this.props.handleCreate(this.props.column_id - 1, this.props.card.name, this.props.card.color)} tabIndex="-1" >
                            <span className="material-icons transform">
                              account_tree
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-danger" onClick={() => this.props.handleDelete(this.props.id, this.props.column_id)} tabIndex="-1" >
                            <span className="material-icons">
                              delete_sweep
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-secondary" onClick={() => this.moveHorizon(-1)} tabIndex="-1" >
                            <span className="material-icons">
                              keyboard_backspace
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-secondary" onClick={() => this.moveHorizon(1)} tabIndex="-1" >
                            <span className="material-icons">
                              arrow_right_alt
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-secondary bg-warning text-white" onClick={() => this.props.handleInputChange("#ffc107", "color", this.props.card)} tabIndex="-1" >
                            <span className="material-icons">
                              format_paint
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-secondary bg-primary text-white" onClick={() => this.props.handleInputChange("#007bff", "color", this.props.card)} tabIndex="-1" >
                            <span className="material-icons">
                              format_paint
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-lg btn-outline-secondary bg-success text-white" onClick={() => this.props.handleInputChange("#28a745", "color", this.props.card)} tabIndex="-1" >
                            <span className="material-icons">
                              format_paint
                            </span>
                          </button>
                          <button className="btn btn-lg btn-outline-secondary bg-danger text-white" onClick={() => this.props.handleInputChange("#dc3545", "color", this.props.card)} tabIndex="-1" >
                            <span className="material-icons">
                              format_paint
                            </span>
                          </button>
                        </li>
                        <li>
                          <small className="text-muted">
                            <span className="material-icons" style={{ fontSize: 12 }}>
                              build
                            </span>
                            <Time time={this.props.created_at}/>
                          </small>
                        </li>
                      </ul>
                    </div> {/* dropmenu */}
                  </div> {/* col */}
                </div> {/* row */}
              </div> {/* container */}

            </div> // card
        );
    }
}

Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};
export default Card;
