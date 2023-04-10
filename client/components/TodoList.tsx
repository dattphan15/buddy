import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: '100%',
    marginBottom: 10,
  },
});


interface Todo {
  id: number;
  text: string;
}


const TodoList = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text }]);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Add a to-do item"
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        extraData={todos}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;