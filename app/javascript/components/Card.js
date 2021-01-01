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
            <div className="Card">
              <div className="CardHeader">
                <input type="text" value={this.state.form.name} placeholder="Title" onChange={e=>this.handleChange(e, "name", this.props.id)} />
                <button className="ContentButton btn btn-sm btn-outline-danger float-right" onClick={() => this.props.handleDelete(this.props.id)} tabIndex="-1" >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
              <div className="CardContent">
                <small>
                <input type="text" value={this.state.form.description} placeholder="description" onChange={e=>this.handleChange(e, "description", this.props.id)} />
	        </small>
                <button className="ContentButton btn btn-sm btn-outline-primary float-right" onClick={() => this.props.handleCreate(this.props.column_id - 1, this.state.form.name)} tabIndex="-1" >
                  <i className="fas fa-project-diagram fa-flip-horizontal"></i>
                </button>
              </div>
              <div className="CardFooter">
                <small className="float-right text-secondary">
                  <Time time={this.props.created_at}/>
                </small>
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
