import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";
import {
  action,
  autorun,
  observable,
  reaction,
  runInAction,
  toJS,
  when,
} from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import store, { useStore } from "./stores";

// const App = ({ todos }: { todos: typeof store.todos }) => {
const App = observer(({ todos }: { todos: ReturnType<typeof TodoStore> }) => {
  //ways to log
  // console.log("todos.list :>> ", todos.list);
  // console.log("todos.list :>> ", [...todos.list]);
  // console.log("todos.list :>> ", JSON.parse(JSON.stringify(todos.list)));
  console.log("todos.list :>> ", toJS(todos.list));

  useEffect(() => {
    const promiseWhen = when(() => {
      return !appUI.todosVisible;
    });
    promiseWhen.then(() => {
      console.log("clean up");
    });
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
});

const AppWrapper = () => {
  const { todos } = useStore();

  return <App todos={todos} />;
};

export { App };

export default AppWrapper;
