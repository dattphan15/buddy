import React, { useState } from 'react';
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
});

interface Todo {
  id: string;
  text: string;
}

const TodoList = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    setTodos([...todos, { id: Date.now().toString(), text }]);
    setText('');
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = () => {
    addTodo();
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <TodoCard todo={item} onDelete={handleDelete} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        extraData={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Add a to-do item"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <Button title="Add" onPress={addTodo} />
      </View>
    </View>
  );
};

export default TodoList;