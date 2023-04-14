import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  deleteBox: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
}

const TodoCard = ({ todo, onDelete, onDone }: TodoCardProps) => {
  const rightSwipe = (progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.deleteBox}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }], opacity }]}>Delete</Animated.Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      onSwipeableRightOpen={() => onDelete(todo.id)}
    >
      <View style={styles.container}>
        <CheckBox
          value={todo.isDone}
          onValueChange={() => onDone(todo.id)}
          style={styles.checkbox}
          tintColor="#ccc"
          onCheckColor="#007aff"
          onTintColor="#007aff"
        />
        <Text style={[styles.text, todo.isDone ? { textDecorationLine: 'line-through' } : null]}>{todo.text}</Text>
      </View>
    </Swipeable>
  );
};

export default TodoCard;