import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";
import { action, autorun, observable, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useStore } from "./stores";

function App() {
  const { todos } = useStore();
  useEffect(() => {
    const disposedAutorun = autorun(
      () => {
        console.log("todos.list :>> ", todos.list);
        throw new Error("custom error");
      },
      {
        delay: 1000,
        onError: (error) => console.log("error.message :>> ", error.message),
      }
    );
    return () => {
      disposedAutorun();
    };
  }, []);

  const appUI = useLocalObservable(() => {
    return {
      loading: false,
      todosVisible: true,
      receiveData() {
        this.loading = false;
        this.todosVisible = !this.todosVisible;
      },
      toggleTodoVisibility() {
        this.todosVisible = !this.todosVisible;
      },
    };
  });

  return (
    <div className="App">
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        {String(appUI.loading)}
        <h2 onClick={appUI.toggleTodoVisibility}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
