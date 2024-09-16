import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Button, Text, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font'; 

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  note?: string;
}

interface TodoList {
  id: number;
  name: string;
  todos: Todo[];
}

const TodoListComponent = ({ list, updateList, deleteList }: { list: TodoList; updateList: (updatedList: TodoList) => void; deleteList: () => void }) => {
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedList = {
        ...list,
        todos: [...list.todos, { id: Date.now(), title: newTodo, completed: false, note: newNote }]
      };
      updateList(updatedList);
      setNewTodo('');
      setNewNote('');
    }
  };

  const deleteTodo = (todoId: number) => {
    const updatedList = {
      ...list,
      todos: list.todos.filter(todo => todo.id !== todoId)
    };
    updateList(updatedList);
  };

  const toggleComplete = (todoId: number) => {
    const updatedList = {
      ...list,
      todos: list.todos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)
    };
    updateList(updatedList);
  };

  const startEditing = (todoId: number, title: string, note?: string) => {
    setEditMode(true);
    setEditTodoId(todoId);
    setNewTodo(title);
    setNewNote(note || '');
  };

  const updateTodo = () => {
    if (editTodoId !== null && newTodo.trim()) {
      const updatedList = {
        ...list,
        todos: list.todos.map(todo => 
          todo.id === editTodoId ? { ...todo, title: newTodo, note: newNote } : todo
        )
      };
      setNewTodo('');
      setNewNote('');
      setEditMode(false);
      setEditTodoId(null);
    }
  };

  const toggleAllInList = (completed: boolean) => {
    const updatedList = {
      ...list,
      todos: list.todos.map(todo => ({ ...todo, completed }))
    };
    updateList(updatedList);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
        {/* <Text style={styles.checkboxText}>{item.completed ? '✔️' : '⬜'}</Text> */}
        <Text>{item.completed ? '✓' : '☐'}</Text>
      </TouchableOpacity>
      <View style={styles.todoContent}>
        <Text style={item.completed ? styles.completedText : styles.todoText}>{item.title}</Text>
        {item.note && <Text style={styles.noteText}>{item.note}</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEditing(item.id, item.title, item.note)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{list.name}</Text>
        <TouchableOpacity onPress={deleteList} style={styles.deleteListButton}>
          <Text style={styles.deleteListText}>Delete List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listActions}>
        <TouchableOpacity onPress={() => toggleAllInList(true)}>
          <Text style={styles.actionText}>Check All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleAllInList(false)}>
          <Text style={styles.actionText}>Uncheck All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list.todos}
        keyExtractor={todo => todo.id.toString()}
        renderItem={renderTodoItem}
      />
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          placeholder="New task"
          onChangeText={setNewTodo}
        />
        <TextInput
          style={styles.input}
          value={newNote}
          placeholder="Note (optional)"
          onChangeText={setNewNote}
        />
        <Button title={editMode ? 'Update' : 'Add'} onPress={editMode ? updateTodo : addTodo} />
      </View>
    </View>
  );
};

const App = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState('');

  const addList = () => {
    if (newListName.trim()) {
      setLists([...lists, { id: Date.now(), name: newListName, todos: [] }]);
      setNewListName('');
    }
  };

  const updateList = (updatedList: TodoList) => {
    setLists(lists.map(list => list.id === updatedList.id ? updatedList : list));
  };

  const deleteList = (listId: number) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do Lists</Text>
      <View style={styles.addListContainer}>
        <TextInput
          style={styles.input}
          value={newListName}
          placeholder="New list name"
          onChangeText={setNewListName}
        />
        <Button title="Add List" onPress={addList} />
      </View>
      <FlatList
        data={lists}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoListComponent
            list={item}
            updateList={updateList}
            deleteList={() => deleteList(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  addListContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteListButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  deleteListText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 10,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  noteText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 10,
  },
  addTodoContainer: {
    marginTop: 8,
  },
});

export default App;