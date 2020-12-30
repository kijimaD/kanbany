import React from "react"
import PropTypes from "prop-types"
import Column from "./Column";
import "./Board.css";

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            columns: [],
        };
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        columns: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    render () {
        const { error, columns } = this.state;
        return (
            <div className="Board">
            {this.state.columns.map(column =>
                                    <Column key={column.id}
                                            id={column.id}
                                            name={column.name}
                                            tasks={column.tasks} />
                                   )}
              <button className="Column-add-button btn btn-outline-primary">+</button>
            </div>
        );
    }
}

Board.propTypes = {
    name: PropTypes.string,
};
export default Board;
