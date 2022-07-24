import React, { Component } from "react";
import "./todos.scss";

class Todos extends Component {
  getCurrentDate(separator = " / ") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }

  state = {
    todos: [
      {
        title: "New Projects",
        data: this.getCurrentDate(),
        status: "Running",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Complete",
        data: this.getCurrentDate(),
        status: "Completed",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Afzal Bidhan",
        data: this.getCurrentDate(),
        status: "Running",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Your Todos",
        data: this.getCurrentDate(),
        status: "Running",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Hello World",
        data: this.getCurrentDate(),
        status: "Completed",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Wake Up Early",
        data: this.getCurrentDate(),
        status: "Completed",
        isCheck: false,
        registerTime: this.currentTime(),
      },
      {
        title: "Go to lesson on time",
        data: this.getCurrentDate(),
        status: "Running",
        isCheck: false,
        registerTime: this.currentTime(),
      },
    ],
    typeView: true,
    typeProgress: true,
    render: "Runnning",
  };

  currentTime() {
    let today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
  }

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
            <h2>{item.title}</h2>
          </div>
          <div>
            <p>{item.data}</p>
            <p>{item.registerTime}</p>
          </div>
          <button
            className="progress-btn"
            style={{
              background: item.status == "Completed" ? "red" : "#28a745",
            }}
            disabled={item.status === "Completed"}
            onClick={() => {
              item.status = "Completed";
              this.setState(this.state);
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

  addTodo = (event) => {
    const todos = this.state.todos;
    if (event.key === "Enter" && event.target.value != "") {
      const todo = {
        title: event.target.value,
        data: this.getCurrentDate(),
        status: "Running",
        isCheck: false,
        registerTime: this.currentTime(),
      };
      console.log(this.currentTime());
      todos.push(todo);
      event.target.value = "";
    }
    this.setState({ todos });
  };

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
          <input
            type="text"
            onKeyPress={this.addTodo}
            className="add-todo"
            placeholder="Add Todo ..."
          />
          {this.renderTodos(this.state.render, this.state.typeProgress)}
        </div>
        <h2>Tugadi</h2>;
      </div>
    );
  }
}

export default Todos;
