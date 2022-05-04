import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TodoItem = ({title, folder, time}) => {
  return (
    <View style={styles.todo}>
      <Text style={styles.title}>{title}</Text>
      <Text>at {folder}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#F9DCCD',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  time: {
    fontSize: 14,
    marginTop: 24,
  },
});

export default TodoItem;
