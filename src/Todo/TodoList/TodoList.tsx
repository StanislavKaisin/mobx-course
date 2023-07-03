import { observer } from "mobx-react-lite";
import React from "react";
import TodoStore, { ITodo } from "../../stores/TodoStore";
import styles from "./TodoList.module.css";
import { useStore } from "../../stores";

// const TodoList = ({ todos }: { todos: TodoStore }) => {
const TodoList = () => {
  const { todos } = useStore();

  const handleToggleTodo = (todo: ITodo) => () => {
    todos.toggle(todo);
  };
  const handleRemoveTodo = (todo: ITodo) => () => {
    todos.remove(todo.id);
  };
  return (
    <ul className={styles["todo-list"]}>
      {todos.list.map((todo) => {
        return (
          <li key={todo.id}>
            <label
              htmlFor={todo.id + ""}
              className={todo.isDone ? styles.done : ""}
            >
              {todo.title}
            </label>
            <button
              onClick={handleRemoveTodo(todo)}
              className={[styles.remove, todo.isDone && styles.done].join(" ")}
            >
              remove
            </button>
            <button onClick={handleToggleTodo(todo)}>
              <input type="checkbox" id={todo.id + ""} readOnly tabIndex={-1} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(TodoList);
