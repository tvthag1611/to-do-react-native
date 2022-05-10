import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TodoItem = ({title, folder, dateCreate, dateSet}) => {
  return (
    <View style={styles.todo}>
      <Text style={styles.title}>{title}</Text>
      <Text>at {folder ? folder.name : 'All notes'}</Text>
      {dateSet && (
        <View style={styles.reminder}>
          <Icon name="bells" size={20} color="white" />
          <Text style={{marginLeft: 5, color: 'white'}}>
            {new Date(dateSet).toLocaleString('vi')}
          </Text>
        </View>
      )}
      <Text style={styles.time}>
        {new Date(dateCreate).toLocaleString('vi')}
      </Text>
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
  reminder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E3266C',
    padding: 5,
    borderRadius: 10,
  },
});

export default TodoItem;
