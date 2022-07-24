import React, { Component } from "react";
import "./todos.scss";

class Todos extends Component {
  state = {
    todos: [
      {
        title: "New Projects",
        data: "Sun Jul 25 2022",
        status: "Running",
        isCheck: false,
      },
      {
        title: "Complete",
        data: "Sun Jul 25 2022",
        status: "Completed",
        isCheck: false,
      },
      {
        title: "Afzal Bidhan",
        data: "Sun Jul 25 2022",
        status: "Running",
        isCheck: false,
      },
      {
        title: "Your Todos",
        data: "Sun Jul 25 2022",
        status: "Running",
        isCheck: false,
      },
      {
        title: "Hello World",
        data: "Sun Jul 25 2022",
        status: "Completed",
        isCheck: false,
      },
      {
        title: "Wake Up Early",
        data: "Sun Jul 25 2022",
        status: "Completed",
        isCheck: false,
      },
      {
        title: "Go to lesson on time",
        data: "Sun Jul 25 2022",
        status: "Running",
        isCheck: false,
      },
    ],
    typeView: true,
    typeProgress: true,
    render: "Runnning",
  };
  controllers = {
    view: {
      typeView: [
        { name: "List View", className: "list", value: true },
        { name: "Table View", className: "table", value: false },
      ],
      status: true,
    },
  };

  randomKey() {
    const key = `${Math.random() * 10}`;
    return key.substr(2, 4);
  }

  changeProgress(type = "Running", all = true) {
    this.state.render = type;
    this.state.typeProgress = all;
    this.setState({ ...this.state });
  }

  renderTodos() {
    const { todos, render, typeProgress } = this.state;
    return todos.map((item, idx) =>
      item.status === render || typeProgress === true ? (
        <div className="todo" key={this.randomKey()}>
          <div className="title">
            <input
              type="checkbox"
              onClick={(e) => {
                item.isCheck = !item.isCheck;
              }}
              key={this.randomKey()}
            />
            <div>
              <h2>{item.title}</h2>
              <p>{item.data}</p>
            </div>
          </div>
          <button
            className="progress-btn"
            style={{
              background: item.status == "Completed" ? "red" : "#28a745",
            }}
            disabled={item.status === "Completed"}
            onClick={() => {
              item.status = "Completed";
              this.setState(this.state)
            }}
          >
            {item.status}
          </button>
        </div>
      ) : (
        ""
      )
    );
  }

  render() {
    return (
      <div className="advanced-todos">
        <div className="controllers">
          <div className="progress">
            <button
              className="all"
              onClick={() => this.changeProgress("Running", true)}
            >
              All
            </button>
            <button
              className="running"
              onClick={() => this.changeProgress("Running", false)}
            >
              Running
            </button>
            <button
              className="completed"
              onClick={() => this.changeProgress("Completed", false)}
            >
              Completed
            </button>
          </div>

          <div className="typeView">
            {this.controllers.view.typeView.map((item) => (
              <div key={this.randomKey()} className="view">
                <input
                  type="checkbox"
                  key={this.randomKey()}
                  id={item.className}
                ></input>
                <label htmlFor={item.className} key={this.randomKey()}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <div className="delBtns">
            <button
              className="selected"
              onClick={() => {
                const todos = this.state.todos.filter(
                  (todo) => todo.isCheck !== true
                );
                this.setState({ todos });
              }}
            >
              Clear Selected
            </button>
            <button
              className="completed"
              onClick={() => {
                const todos = this.state.todos.filter(
                  (todo) => todo.status !== "Completed"
                );
                this.setState({ todos });
              }}
            >
              Clear Completed
            </button>
            <button className="reset">Reset</button>
          </div>
        </div>
        <div className="todos-list">
          {this.renderTodos(this.state.render, this.state.typeProgress)}
        </div>
        <h2>Tugadi</h2>;
      </div>
    );
  }
}

export default Todos;
