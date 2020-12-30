import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js"
import "./Card.css";

class Card extends React.Component {

    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            form: {
                name: this.props.name,
                description: this.props.description,
            }
        }
    }

    componentDidMount() {

    }

    handleChange(e, key){
        let target = e.target;
        let value = target.value;
        let form = this.state.form;
        form[key] = value;

        this.setState({
            form: form
        });
    }

    handleDelete(id){
        fetch(`/api/v1/tasks/${id}`,
              {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
            .then((response) => {
                this.props.deleteTask(id);
            });
    }

    render () {
        return (
            <div className="Card">
              <div className="CardHeader">
                <input type="text" value={this.state.form.name} onChange={e=>this.handleChange(e, 'name')} />
                <button className="ContentButton btn btn-sm btn-outline-danger float-right" onClick={() => this.handleDelete(this.props.id)}>X</button>
              </div>
              <div className="CardContent">
                <small>
	          {this.state.form.description}
	        </small>
                <button className="ContentButton btn btn-sm btn-outline-primary float-right">←</button>
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
