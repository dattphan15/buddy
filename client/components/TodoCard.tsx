import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});

interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

interface TodoCardProps {
  todo: Todo;
  onDone: (id: string) => void;
}

const TodoCard = ({ todo, onDone }: TodoCardProps) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={todo.isDone}
        onValueChange={() => onDone(todo.id)}
        style={styles.checkbox}
        tintColor="#ccc"
        onCheckColor="#007aff"
        onTintColor="#007aff"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, todo.isDone && { textDecorationLine: 'line-through' }]}>{todo.text}</Text>
      </View>
    </View>
  );
};

export default TodoCard;