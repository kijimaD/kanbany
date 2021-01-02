import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js";
import "./Card.css";

class Card extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            form: {
                name: this.props.name,
                description: this.props.description,
            }
        };
    }

    componentDidMount() {

    }

    render () {
        return (
            <div className="Cards container-fluid">
              <div className="row">

                <div className="col-10 px-0">
	          <div className="CardHeader" style={{ borderBottomColor: 'black' }}>
                    <input type="text" value={this.props.name} placeholder="Title" onChange={e=>this.props.handleChange(e, "name", this.props.id, this.props.column_id)} />
	          </div>

	          <div className="CardContent">
                    <small>
                      <input type="text" value={this.props.description} placeholder="Description" onChange={e=>this.props.handleChange(e, "description", this.props.id, this.props.column_id)} />
	            </small>
                  </div>
                  <div className="CardFooter">
                    <small className="float-right text-secondary">
                      <Time time={this.props.created_at}/>
                    </small>
                  </div>
                </div>

                <div className="col-2 px-0">
                  <div className="dropright drop-hover">
                    <button className="MenuButton btn btn-outline-primary py-4 pl-0" data-toggle="dropdown" tabIndex="-1">
                      <span className="material-icons">
                        layers
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="ContentButton btn btn-lg btn-outline-primary" onClick={() => this.props.handleCreate(this.props.column_id - 1, this.props.name)} tabIndex="-1" >
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
                        <button className="ContentButton btn btn-lg btn-outline-secondary" onClick={() => this.props.handleValueChange("column_id", this.props.card, this.props.column_id, this.props.column_id, this.props.column_id - 1)} tabIndex="-1" >
                          <span className="material-icons">
                            keyboard_backspace
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="ContentButton btn btn-lg btn-outline-secondary" onClick={() => this.props.handleValueChange("column_id", this.props.card, this.props.column_id, this.props.column_id, this.props.column_id + 1)} tabIndex="-1" >
                          <span className="material-icons">
                            arrow_right_alt
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
        );
    }
}

Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};
export default Card;
