import React, { ChangeEvent, FormEvent, useState } from "react";
import TodoStore from "../../stores/TodoStore";
import styles from "./TodoInput.module.css";

export const TodoInput = ({ todos }: { todos: TodoStore }) => {
  // const [newTodo, setNewTodo] = useState("");
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setNewTodo(e.target.value);
  // };
  const handleButtonClick = (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const value = String(formData.get("todo-input")) || "";
    todos.add(value);
    formElement.reset();
  };
  return (
    <form className={styles["todo-input-group"]} onSubmit={handleButtonClick}>
      <input name="todo-input" placeholder="Add todo..." />
      <button
        type="submit"
        // onClick={handleButtonClick}
      >
        Add todo
      </button>
    </form>
  );
};
