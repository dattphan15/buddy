import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import TodoCard from './TodoCard';

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
    marginBottom: 10,
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

  const renderItem = ({ item }: { item: Todo }) => (
    <TodoCard todo={item} onDelete={handleDelete} onDone={handleDone} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        extraData={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {doneTodos.length > 0 && (
        <View>
          <Text>Done:</Text>
          <FlatList
            data={doneTodos}
            extraData={doneTodos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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