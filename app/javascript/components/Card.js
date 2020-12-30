import React from "react";
import PropTypes from "prop-types";
import Time from "./Time.js"
import "./Card.css";

class Card extends React.Component {

    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {

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
                this.props.deleteTask(id)
            });
    }

    render () {
        return (
            <div className="Card">
              <div className="CardHeader">
                <input type="text" value={this.props.name}/>
                <button className="ContentButton btn btn-sm btn-outline-danger float-right" onClick={() => this.handleDelete(this.props.id)}>X</button>
              </div>
              <div className="CardContent">
                <small>
	          {this.props.description}
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
