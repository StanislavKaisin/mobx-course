import React, { useState } from "react";
import styles from "./App.module.css";

import "./App.css";
import { TodoInput } from "./Todo/TodoInput/TodoInput";

import TodoStore from "./stores/TodoStore";
import TodoList from "./Todo/TodoList/TodoList";
import { action, observable, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";

const todos = TodoStore();

function App() {
  const appUI = useLocalObservable(() => {
    return {
      loading: false,
      todosVisible: true,
      receiveData() {
        this.loading = false;
        this.todosVisible = !this.todosVisible;
      },
      toggleTodoVisibility() {
        this.loading = true;
        new Promise((resolve) => {
          setTimeout(() => {
            return resolve(void 0);
          }, 1000);
        }).then(
          // first case
          // action(() => {
          //   this.loading = false;
          //   this.todosVisible = !this.todosVisible;
          // })

          // second case
          // () => {
          //   runInAction(() => {
          //     this.loading = false;
          //     this.todosVisible = !this.todosVisible;
          //   });
          // }

          // third case
          this.receiveData
        );
      },
    };
  });
  // const handleClick = () => {
  //   appUI.toggleTodoVisibility();
  // };
  const todosVisible = observable.box(true);
  //@ts-ignore
  todosVisible.observe_((newValue) => {
    console.log("newValue :>> ", newValue);
  });
  todosVisible.set(false);
  return (
    <div className="App">
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        {String(appUI.loading)}
        <h2 onClick={appUI.toggleTodoVisibility}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
