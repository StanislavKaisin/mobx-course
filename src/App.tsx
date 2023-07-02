import React from "react";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";

const todos = new TodoStore();

function App() {
  return (
    <div className="App">
      <TodoInput todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
