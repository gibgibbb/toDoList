import { Todo } from './types';

export const addTodo = (
  newTodo: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  if (newTodo.trim()) {
    setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
    setNewTodo('');
  }
};

export const deleteTodo = (
  id: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

export const toggleComplete = (
  id: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

export const startEditing = (
  id: number,
  title: string,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  setEditMode(true);
  setEditTodoId(id);
  setNewTodo(title);
};

export const updateTodo = (
  editTodoId: number | null,
  newTodo: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (editTodoId !== null && newTodo.trim()) {
    setTodos(
      todos.map(todo => (todo.id === editTodoId ? { ...todo, title: newTodo } : todo))
    );
    setNewTodo('');
    setEditMode(false);
    setEditTodoId(null);
  }
};
