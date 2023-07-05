import React, { useState } from "react";
import styles from "./App.module.css";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

const todos = TodoStore();

function App() {
  const [appUI] = useState(() => {
    return observable({
      todosVisible: true,
      toggleTodoVisibility() {
        this.todosVisible = !this.todosVisible;
      },
    });
  });
  const handleClick = () => {
    appUI.toggleTodoVisibility();
  };
  return (
    <div className="App">
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        <h2 onClick={handleClick}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
