import React from "react"
import PropTypes from "prop-types"
import Column from "./Column";
import "./Board.css";

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            columns: [],
        };
        this.handleCopy = this.handleCopy.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
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

    handleCreate(column_id, name=""){
        let body = JSON.stringify({
            task: {
                column_id: column_id,
		name: name
            }
        });
        fetch(`/api/v1/tasks`,
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body,
              })
            .then((response) => {return response.json();})
            .then((task) => {
                this.addTask(task, column_id);
            });
    }

    addTask(task, column_id){
        var columns = [...this.state.columns];
        columns.map(function(column){
            if(column.id === column_id) {
                column.tasks = column.tasks.concat(task);
            }
        }
                   );

        this.setState({
            columns: columns
        });
    }

    render () {
        const { error, columns } = this.state;
        return (
		<div className="Board">
		{this.state.columns.map(column =>
					<Column key={column.id}
					id={column.id}
					name={column.name}
					tasks={column.tasks}
					handleCreate={this.handleCreate}
					/>
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
