import React, { useState } from "react";
import styles from "./App.module.css";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";

const todos = TodoStore();

function App() {
  const [todosVisible, setTodosVisible] = useState(true);
  const handleClick = () => {
    setTodosVisible((state) => !state);
  };
  return (
    <div className="App">
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        <h2 onClick={handleClick}>
          <span>{todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default App;
