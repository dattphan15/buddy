import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import TodoCard from './TodoCard';
import axios from 'axios';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: '80%',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    // marginBottom: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '80%',
    position: 'absolute',
    right: 0,
    marginVertical: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

const TodoList = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const inputRef = useRef<TextInput>(null);

  const addTodo = () => {
    setTodos([...todos, { id: Date.now().toString(), text, isDone: false }]);
    setText('');
    addTodoItemToServer(1, text); // Replace 'yourUserId' with the actual user ID
  };

  const addTodoItemToServer = async (userId: number, item: string) => {
    try {
      const response = await axios.post('http://localhost:3001/todos', {
        userId,
        title: item,
        description: '', // Add description input and pass it here
        completed: false,
        due_date: null, // Add date input and pass it here
      });
      console.log("New todo item added: ", response.data);
    } catch (error) {
      console.log("Error adding new todo item: ", error);
    }
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setDoneTodos(doneTodos.filter((todo) => todo.id !== id)); // remove the todo from doneTodos as well
  };

  const handleDone = (id: string) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
      const todo = newTodos[todoIndex];
      todo.isDone = !todo.isDone;
      if (todo.isDone) {
        setDoneTodos([...doneTodos, todo]);
      } else {
        setDoneTodos(doneTodos.filter((doneTodo) => doneTodo.id !== todo.id));
      }
      setTodos(newTodos);
    }
  };

  const handleSubmit = () => {
    addTodo();
    inputRef.current?.focus();
  };

  const renderHiddenItem = ({ item }: { item: Todo }) => (
    <View style={styles.rowBack}>
      <View style={styles.deleteButton}>
        <Text
          style={styles.deleteButtonText}
          onPress={() => handleDelete(item.id)}
        >
          Delete
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={todos}
        renderItem={({ item }) => (
          <TodoCard todo={item} onDone={handleDone} />
        )}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        rightOpenValue={-80}
      />
      {doneTodos.length > 0 && (
        <View>
          <Text>Done:</Text>
          <SwipeListView
            data={doneTodos}
            renderItem={({ item }) => (
              <TodoCard todo={item} onDone={handleDone} />
            )}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            rightOpenValue={-80}
        />
      </View>
    )}
    <View style={styles.inputWrapper}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Add a to-do item"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        blurOnSubmit={false}
      />
      <Button title="Add" onPress={addTodo} />
    </View>
  </View>
);
};

export default TodoList;