import React from "react";
import PropTypes from "prop-types";
import Column from "./Column";
import "./Board.css";
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import actionCable from 'actioncable';

const DELAY_INTERVAL = 1000;
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      columns: [],
      settingMode: false,
    };
    this.toggleSettingMode = this.toggleSettingMode.bind(this);
    // Column
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleColumnDelete = this.handleColumnDelete.bind(this);
    this.handleOnDragEndColumn = this.handleOnDragEndColumn.bind(this);
    // Task ----------
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setupSubscription();
    this.fetchBoard();
  }

  componentWillUnmount() {
    this.deleteOldSubscription();
  }

  setupSubscription() {
    const App = {};
    App.cable = actionCable.createConsumer();
    App.board = App.cable.subscriptions.create({ channel: 'BoardChannel' }, {
      connected: () => { console.log('connected'); },
      disconnected: () => { console.log('disconnected'); },
      received: () => {
        console.log('received!');
        this.fetchBoard();
      },
    });
  }

  deleteOldSubscription() {
    if (App.cable.subscriptions.subscriptions.length > 0) {
      App.cable.subscriptions.subscriptions.forEach((subscription) => {
        App.cable.subscriptions.remove(subscription);
      });
    }
  }

  fetchBoard() {
    fetch(this.props.url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ columns: result });
        },
        (error) => {
          this.setState({ error });
        },
      );
  }

  toggleSettingMode(e) {
    const mode = e.target.checked;
    this.setState({ settingMode: mode });
  }

  // Column ----------
  handleColumnCreate(boardId, name = '') {
    const body = JSON.stringify({
      column: {
        board_id: boardId,
        name,
      },
    });
    fetch('/api/v1/columns',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      .then((response) => { return response.json(); })
      .then((column) => {
        this.addColumn(column);
      });
  }

  addColumn(column) {
    const insertColumn = column;
    const columns = [...this.state.columns];
    insertColumn.tasks = [];
    columns.push(insertColumn);

    this.setState({ columns });
  }

  handleColumnUpdate(column) {
    const body = JSON.stringify({ column });
    fetch(`/api/v1/columns/${column.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  }

  handleColumnChange(e, key, argColumn){
    let target = e.target;
    let value = target.value;
    const columns = [...this.state.columns];

    columns.forEach((column) => {
      if (column.id === argColumn.id) {
        column[key] = value;
      }
    });

    clearTimeout(this.timer);

    this.setState({ columns });

    this.timer = setTimeout(this.handleColumnUpdate, DELAY_INTERVAL, argColumn);
  }

  handleColumnDelete(id) {
    const check = window.confirm('Are you sure you want to delete the column?');
    if (check){
      fetch(`/api/v1/columns/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(this.deleteColumn(id));
    }
  }

  deleteColumn(id) {
    let columns = [...this.state.columns];
    columns = columns.filter((column) => column.id !== id);

    this.setState({ columns });
  }

  // Task ----------
  handleCreate(columnId, name = '', color = 'black'){
    const body = JSON.stringify({
      task: {
        column_id: columnId,
        name,
        color,
      },
    });
    fetch('/api/v1/tasks',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      .then((response) => { return response.json(); })
      .then((task) => {
        this.addTask(task, columnId);
      });
  }

  addTask(task, columnId){
    const columns = [...this.state.columns];
    columns.forEach((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.concat(task);
      }
    });

    this.setState({ columns });
  }

  handleDelete(id, columnId){
    fetch(`/api/v1/tasks/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(this.deleteTask(id, columnId));
  }

  deleteTask(taskId, columnId){
    const columns = [...this.state.columns];
    columns.forEach((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
    });
    this.setState({ columns });
  }

  handleInputChange(e, key, processTask){
    function get() {
      try {
        const target = e.target;
        const value = target.value;
        return value;
      } catch (f) {
        return e;
      }
    }

    const value = get();

    const columns = [...this.state.columns];

    columns.forEach((column) => {
      if (column.id === processTask.column_id) {
        column.tasks.forEach((task) => {
          if (task.id === processTask.id) {
            task[key] = value;
          }
        });
      }
    });

    clearTimeout(this.timer);

    this.setState({ columns });
    this.timer = setTimeout(this.handleUpdate, DELAY_INTERVAL, processTask);
  }

  handleUpdate(task) {
    const body = JSON.stringify({ task });
    fetch(`/api/v1/tasks/${task.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  }

  handleOnDragEndColumn(result) {
    if (!result.destination) return;

    const columnId = parseInt(result.draggableId.split('-')[0], 10);
    const taskId = parseInt(result.draggableId.split('-')[1], 10);
    const columns = [...this.state.columns];

    function getTask() {
      return columns.filter((column) => column.id === columnId)[0].tasks
        .filter((task) => task.id === taskId)[0];
    }

    if (result.type === 'column') {
      const [reorderedColumn] = columns.splice(result.source.index, 1);
      columns.splice(result.destination.index, 0, reorderedColumn);

      this.setState({ columns });
      this.updateColumnRank(columnId, result.destination.index);
    }

    if (result.type === 'card') {
      if (result.source.droppableId === result.destination.droppableId) {
        // same column
        columns.forEach((column) => {
          if (column.id === columnId) {
            const [reorderedItem] = column.tasks.splice(result.source.index, 1); // Get tesk
            column.tasks.splice(result.destination.index, 0, reorderedItem); // Add
          }
        });

        this.updateTaskRank(taskId, columnId, result.destination.index);
      } else {
        // different column
        const processTask = getTask();

        columns.forEach((column) => {
          // delete
          if (column.id === columnId) {
            column.tasks = column.tasks.filter((task) => task.id !== taskId);
          }
          // add
          if (column.id === parseInt(result.destination.droppableId, 10)) {
            processTask.column_id = parseInt(result.destination.droppableId, 10);
            column.tasks.splice(result.destination.index, 0, processTask); // Add
          }
        });

        this.updateTaskRank(taskId, result.destination.droppableId, result.destination.index);
        this.handleInputChange(moment().format(), 'moved_at', processTask);
      }

      this.setState({ columns });
    }
  }

  updateColumnRank(columnId, index) {
    const body = JSON.stringify({
      column: { row_order_position: index },
    });
    fetch(`/api/v1/columns/${columnId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  }

  updateTaskRank(taskId, columnId, index) {
    const body = JSON.stringify({
      task: {
        row_order_position: index,
        column_id: columnId,
      },
    });

    fetch(`/api/v1/tasks/${taskId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  }

  render() {
    const { error, columns } = this.state;

    const getListStyle = isDraggingOver => ({
      display: 'flex',
      padding: grid,
      overflow: 'auto',
    });

    const grid = 8;

    return (
      <div className="Board">
        <DragDropContext onDragEnd={this.handleOnDragEndColumn}>
          <Droppable droppableId="column" type="column" direction="horizontal">
            {(provided, snapshot) => (
              <ul
                className="columns"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.columns.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={String(column.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Column
                          key={column.id}
                          column={column}
                          tasks={column.tasks}
                          handleColumnChange={this.handleColumnChange}
                          handleColumnDelete={this.handleColumnDelete}
                          handleCreate={this.handleCreate}
                          handleDelete={this.handleDelete}
                          handleInputChange={this.handleInputChange}
                          settingMode={this.state.settingMode}
                          provided={provided}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {this.state.settingMode
                && <button className="btn btn-outline-primary btn-block float-right" onClick={() => this.handleColumnCreate(this.state.columns[0].board_id)} style={{ maxWidth: 40 }} type="button">+</button>}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <input className="switch" type="checkbox" onChange={(e) => this.toggleSettingMode(e)} />
        {/* ↑Column Setting */}
      </div>
    );
  }
}

Board.propTypes = {
  name: PropTypes.string,
};
export default Board;
