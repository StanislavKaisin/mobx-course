import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";

export interface ITodo {
  id: number;
  title: string;
  isDone: boolean;
}

const TodoStore = () => {
  return makeAutoObservable({
    list: [] as ITodo[],
    add(title: string) {
      if (title.length < 3) return;
      this.list.push({ title, id: Date.now(), isDone: false });
    },
    toggle(todo: ITodo) {
      todo.isDone = !todo.isDone;
    },
    remove(id: number) {
      this.list = this.list.filter((item) => item.id !== id);
    },
  });
};

// class TodoStore {
//   list: ITodo[] = [];
//   constructor() {
//     // makeObservable(this, {
//     //   list: observable,
//     //   add: action,
//     //   toggle: action,
//     //   remove: action,
//     // });
//     makeAutoObservable(this, {
//       //not an action
//       // add: false,
//       //redefine function type
//       // add: computed,
//     });
//   }
//   add(title: string) {
//     if (title.length < 3) return;
//     this.list.push({ title, id: Date.now(), isDone: false });
//   }
//   toggle(todo: ITodo) {
//     todo.isDone = !todo.isDone;
//   }
//   remove(id: number) {
//     this.list = this.list.filter((item) => item.id !== id);
//   }
// }

export default TodoStore;
