import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Button, Text, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font'; 

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Montserrat: require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'), 
      });
      setFontLoaded(true); 
    };
    loadFonts();
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  if (!fontLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
      setNewTodo('');
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
  };

  const updateTodo = () => {
    if (editTodoId !== null && newTodo.trim()) {
      setTodos(
        todos.map(todo => (todo.id === editTodoId ? { ...todo, title: newTodo } : todo))
      );
      setNewTodo('');
      setEditMode(false);
      setEditTodoId(null);
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{item.completed ? '✔️' : '⬜'}</Text>
      </TouchableOpacity>
      <Text style={item.completed ? styles.completedText : styles.todoText}>{item.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEditing(item.id, item.title)}>
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
      <Button title={editMode ? 'Update Task' : 'Add Task'} onPress={editMode ? updateTodo : addTodo} />
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
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 10,
    fontFamily: 'Montserrat',
  },
});

export default App;