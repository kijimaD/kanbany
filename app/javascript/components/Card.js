import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js";
import MenuColorButton from "./MenuColorButton.js";
import "./Card.css";

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    moveHorizon(i) {
        this.props.handleMove("column_id",
                              this.props.task,
                              this.props.task.column_id + i,
                              this.props.task.column_id,
                              this.props.task.column_id + i);
    }

    bgGradient(color) {
        switch (color) {
        case 'yellow':
            return "linear-gradient(150deg, #efec88, #fefabc)";
        case 'pink':
            return "linear-gradient(150deg, #ff7eb9, #ffb1d5)";
        case 'green':
            return "linear-gradient(150deg, #b9ff7e, #ceffa4)";
        case 'blue':
            return "linear-gradient(150deg, #70f1ec, #bcfdff)";
        }
        return "linear-gradient(150deg, #efec88, #fefabc)";
    }

    render () {
        return (
            <div className="Card mb-2" style={{ background: this.bgGradient(this.props.task.color) }}>

              <input type="text" value={this.props.task.description} placeholder="Description" onChange={e=>this.props.handleInputChange(e, "description", this.props.task)} className="Description mb-2 pb-0" />

              <div className="container">
                <div className="row">

                  <div className="col-10 p-0 d-flex align-items-end">
                    <input type="text" value={this.props.task.name} placeholder="Title" onChange={e=>this.props.handleInputChange(e, "name", this.props.task)} className="text-dark small border-top border-dark" />
                  </div> {/* col */}

                  <div className="col-2 p-0">
                    <div className="dropright drop-hover text-right">
                      <button className="btn border-0 my-0 pr-0 pb-0" data-toggle="dropdown" tabIndex="-1">
                        <span className="material-icons text-dark">
                          whatshot
                        </span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="MenuButton btn btn-lg btn-outline-primary" onClick={() => this.props.handleCreate(this.props.task.column_id - 1, this.props.task.name, this.props.task.color)} tabIndex="-1" >
                            <span className="material-icons transform">
                              account_tree
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="MenuButton btn btn-lg btn-outline-danger" onClick={() => this.props.handleDelete(this.props.task.id, this.props.task.column_id)} tabIndex="-1" >
                            <span className="material-icons">
                              delete_sweep
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="MenuButton btn btn-lg btn-outline-secondary" onClick={() => this.moveHorizon(-1)} tabIndex="-1" >
                            <span className="material-icons">
                              arrow_left
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="MenuButton btn btn-lg btn-outline-secondary" onClick={() => this.moveHorizon(1)} tabIndex="-1" >
                            <span className="material-icons">
                              arrow_right
                            </span>
                          </button>
                        </li>
                        <li>
                          <MenuColorButton color_code="yellow"
                                           handleInputChange={this.props.handleInputChange}
                                           task={this.props.task}
                          />
                        </li>
                        <li>
                          <MenuColorButton color_code="blue"
                                           handleInputChange={this.props.handleInputChange}
                                           task={this.props.task}
                          />
                        </li>
                        <li>
                          <MenuColorButton color_code="green"
                                           handleInputChange={this.props.handleInputChange}
                                           task={this.props.task}
                          />
                        </li>
                        <li>
                          <MenuColorButton color_code="pink"
                                           handleInputChange={this.props.handleInputChange}
                                           task={this.props.task}
                          />
                        </li>
                        <li>
                          <small className="text-muted">
                            <span className="material-icons" style={{ fontSize: 12 }}>
                              build
                            </span>
                            <Time time={this.props.task.created_at}/>
                          </small>
                        </li>
                        <li>
                          <small className="text-muted">
                            <span className="material-icons" style={{ fontSize: 12 }}>
                              games
                            </span>
                            <Time time={this.props.task.moved_at}/>
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
