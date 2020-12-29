import React from "react"
import PropTypes from "prop-types"
import Column from "./Column";
import "./Board.css";

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {initialColumns: this.props.columns, columns:[]}
    }

    componentDidMount() {
        this.setState({columns: this.state.initialColumns})
    }

    render () {
        return (
            <div className="Board">
              {this.state.columns.map(column =>
                                      <Column name={column.name} tasks={column.tasks} />
                                     )}
              <button className="Column-add-button btn btn-outline-primary">+</button>
            </div>
        );
    }
}

Board.propTypes = {
    name: PropTypes.string,
};
export default Board
