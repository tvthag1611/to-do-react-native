import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setItemNotes} from '../../store/notes';

export default function ButtonAdd({navigation}) {
  const dispatch = useDispatch();

  const clickCreate = () => {
    dispatch(setItemNotes({noteItem: null}));
    navigation.navigate('Note');
  };

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
      <TouchableWithoutFeedback onPress={clickCreate}>
        <Icon name="plus" size={30} color="white" />
      </TouchableWithoutFeedback>
    </View>
  );
}
