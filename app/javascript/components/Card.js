import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js"
import "./Card.css";

class Card extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            form: {
                name: this.props.name,
                description: this.props.description,
            }
        }
    }

    componentDidMount() {

    }

    handleChange(e, key, id){
        let target = e.target;
        let value = target.value;
        let form = this.state.form;
        form[key] = value;

        this.setState({
            form: form
        });

        this.handleUpdate(id);
    }

    handleUpdate(id){
        let body = JSON.stringify({
            task: {
                name: this.state.form.name,
                description: this.state.form.description,
            }
        });
        fetch(`/api/v1/tasks/${id}`,
              {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              });
    }

    render () {
        return (
            <div className="Cards container-fluid">
              <div className="row">

                <div className="col-10">
	          <div className="CardHeader" style={{ borderBottomColor: 'black' }}>
                    <input type="text" value={this.state.form.name} placeholder="Title" onChange={e=>this.handleChange(e, "name", this.props.id)} />
	          </div>

	          <div className="CardContent">
                    <small>
                      <input type="text" value={this.state.form.description} placeholder="description" onChange={e=>this.handleChange(e, "description", this.props.id)} />
	            </small>
                  </div>
                  <div className="CardFooter">
                    <small className="float-right text-secondary">
                      <Time time={this.props.created_at}/>
                    </small>
                  </div>
                </div>

                <div className="col-2">
                  <div className="dropleft drop-hover float-right">
                    <button className="MenuButton btn btn-lg btn-block btn-outline-primary py-4" data-toggle="dropdown">
                      <span className="material-icons">
                        lens
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropright drop-hover float-right">
                        <li>
                          <button className="ContentButton btn btn-lg btn-block btn-outline-primary" onClick={() => this.props.handleCreate(this.props.column_id - 1, this.state.form.name)} tabIndex="-1" >
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
export default Card
