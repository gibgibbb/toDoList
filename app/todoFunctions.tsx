import { Todo, TodoList } from './types';

export const addList = (
  newListName: string,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>,
  setNewListName: React.Dispatch<React.SetStateAction<string>>
) => {
  if (newListName.trim()) {
    setLists([...lists, { id: Date.now(), name: newListName, todos: [] }]);
    setNewListName('');
  }
};

export const updateList = (
  updatedList: TodoList,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.map(list => list.id === updatedList.id ? updatedList : list));
};

export const deleteList = (
  listId: number,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.filter(list => list.id !== listId));
};

export const addTodo = (
  listId: number,
  newTodo: string,
  newNote: string,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  if (newTodo.trim()) {
    setLists(lists.map(list => 
      list.id === listId ? 
        { ...list, todos: [...list.todos, { id: Date.now(), title: newTodo, completed: false, note: newNote }] }
        : list
    ));
  }
};

export const deleteTodo = (
  listId: number,
  todoId: number,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.map(list => 
    list.id === listId 
      ? { ...list, todos: list.todos.filter(todo => todo.id !== todoId) }
      : list
  ));
};

export const toggleComplete = (
  listId: number,
  todoId: number,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.map(list => 
    list.id === listId ? 
      { ...list, todos: list.todos.map(todo => 
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )}
      : list
  ));
};



// export const startEditing = (
//   id: number,
//   title: string,
//   setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
//   setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>,
//   setNewTodo: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   setEditMode(true);
//   setEditTodoId(id);
//   setNewTodo(title);
// };

export const updateTodo = (
  listId: number,
  todoId: number,
  newTitle: string,
  newNote: string,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.map(list => 
    list.id === listId ? 
      { ...list, todos: list.todos.map(todo => 
          todo.id === todoId ? { ...todo, title: newTitle, note: newNote } : todo
        )}
      : list
  ));
};

export const toggleAllInList = (
  listId: number,
  completed: boolean,
  lists: TodoList[],
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
) => {
  setLists(lists.map(list => 
    list.id === listId ? 
    { ...list, todos: list.todos.map(todo => ({ ...todo, completed })) }
    : list
  ));
};