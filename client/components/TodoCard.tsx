import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

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
});

interface TodoCardProps {
  todo: {
    id: string;
    text: string;
  };
  onDelete: (id: string) => void;
}

const TodoCard = ({ todo, onDelete }: TodoCardProps) => {
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
        <Text style={styles.text}>{todo.text}</Text>
      </View>
    </Swipeable>
  );
};

export default TodoCard;