import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TodoItem from '../../elements/TodoItem';

export default function NoteInFolder({route, navigation}) {
  const todoList = [
    {
      title: 'Yoga',
      content: 'This is yoga',
      folder: 'Công việc',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 2',
      content: 'This is yoga',
      folder: 'Công việc',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 3',
      folder: 'Công việc',
      content: 'This is yoga',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 4',
      folder: 'Công việc',
      content: 'This is yoga',
      time: '11 : 00 27/02/2022',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
            navigation.setParams({itemTitle: ''});
          }}>
          <Icon name="left" size={30} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{route.params.name}</Text>
      </View>
      <FlatList
        style={{padding: 20}}
        data={todoList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Note', {
                screen: 'Note',
                params: {itemTitle: item.title},
              });
            }}>
            <TodoItem {...item} />
          </TouchableOpacity>
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        keyExtractor={(item, index) => index.toString()}
        // ListFooterComponent={renderFooter}
        // onEndReached={getCoinsAsync}
        // onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
});
