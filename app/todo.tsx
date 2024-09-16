import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Button, Text, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font'; 

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  note: string;
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newNote, setNewNote] = useState<string>(''); // State for the note
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Montserrat: require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'), 
      });
      setFontLoaded(true); 
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false, note: newNote }]);
      setNewTodo('');
      setNewNote('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const startEditing = (id: number, title: string) => {
    setEditMode(true);
    setEditTodoId(id);
    setNewTodo(title);
    setNewNote(note || '');
  };

  const updateTodo = () => {
    if (editTodoId !== null && newTodo.trim()) {
      setTodos(
        todos.map(todo => (todo.id === editTodoId ? { ...todo, title: newTodo, note: newNote } : todo))
      );
      setNewTodo('');
      setNewNote('');
      setEditMode(false);
      setEditTodoId(null);
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{item.completed ? '✔️' : '⬜'}</Text>
      </TouchableOpacity>
      <View style={styles.todoContent}>
        <Text style={item.completed ? styles.completedText : styles.todoText}>{item.title}</Text>
        {item.note && <Text style={styles.noteText}>{item.note}</Text>} {/* Display note if available */}
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <TextInput
        style={styles.input}
        value={newTodo}
        placeholder="Enter a new task"
        onChangeText={setNewTodo}
      />

      <TextInput
        style={styles.input}
        value={newNote}
        placeholder="Enter a note (optional)"
        onChangeText={setNewNote}
      />

      <Button title={editMode ? 'Update Task' : 'Add Task'} onPress={editMode ? updateTodo : addTodo} />
      <Button title="Check All" onPress={() => {
        setTodos(todos.map(todo => ({ ...todo, completed: true })));
      }}/>

      <Button title="Uncheck All" onPress={() => {
        setTodos(todos.map(todo => ({ ...todo, completed: false })));
      }}/>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoItem}
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
    fontFamily: 'Montserrat',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    fontFamily: 'Montserrat',
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 24,
  },
  todoText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    fontFamily: 'Montserrat',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'space-between',
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 10,
    fontFamily: 'Montserrat',
  },
});

export default App;