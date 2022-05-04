import React from 'react';
import {Button, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ButtonAdd({navigation}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#5FADA0',
        padding: 10,
        borderRadius: 100,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Note')}>
        <Icon name="plus" size={30} color="white" />
      </TouchableWithoutFeedback>
    </View>
  );
}
