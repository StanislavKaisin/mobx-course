import TodoStore from "./TodoStore";

let todos = TodoStore();

describe("TodoStore", () => {
  beforeEach(() => {
    todos = TodoStore();
  });

  const todoTitle = "my todo";

  it("should add a new todo", () => {
    todos.add(todoTitle);

    expect(todos.list.length).toBe(1);
    expect(
      todos.list.find((todo) => {
        return todo.title === todoTitle;
      })
    ).toBeDefined();
  });

  it("should remove todo", () => {
    todos.add(todoTitle);
    todos.remove(todos.list[0].id);

    expect(todos.list.length).toBe(0);
  });

  it("should toggle todo", () => {
    todos.add(todoTitle);
    todos.toggle(todos.list[0]);
    expect(todos.list[0].isDone).toBe(true);
    //now test computed value
    expect(todos.unfinishedTodos.length).toBe(0);
  });

  it("should has unfinished todos", () => {
    todos.add(todoTitle);
    expect(todos.unfinishedTodos.length).toBe(1);
  });

  it("should not add empty todo", () => {
    todos.add("");
    expect(todos.unfinishedTodos.length).toBe(0);
  });

  it("should not add todo with less then 3 chars", () => {
    todos.add("12");
    expect(todos.unfinishedTodos.length).toBe(0);
  });

  it("should not add todo with min 3 chars", () => {
    todos.add("123");
    expect(todos.unfinishedTodos.length).toBe(1);
  });
});
