import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomPopup from '../../elements/BottomPopup';
import ChooseFolder from '../../elements/ChooseFolder';
import SetTime from '../../elements/SetTime';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';

export default function Note({route, navigation}) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    folder: '',
    time: '',
  });

  const [showChooseFolder, setShowChooseFolder] = useState(false);
  const [showSetTime, setShowSetTime] = useState(false);

  const {itemTitle, itemId} = route.params;

  useEffect(() => {
    console.log(itemTitle);
    setNote({...note, title: itemTitle});
  }, [itemTitle]);

  const onChange = (name, value) => {
    setNote({
      ...note,
      [name]: value,
    });
  };

  const onDelete = () => {
    axios
      .delete(`${BASE_URL}/note/delete?id=${itemId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

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
        <TouchableWithoutFeedback onPress={() => setShowChooseFolder(true)}>
          <Icon name="folder1" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setShowSetTime(true)}>
          <Icon name="bells" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onDelete()}>
          <Icon name="delete" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Home')}
          disabled={!note.title || !note.content}>
          <Icon name="check" size={30} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{padding: 20}}>
        <TextInput
          value={note.title}
          onChangeText={(text) => onChange('title', text)}
          placeholder="Title"
          multiline={true}
          style={styles.title}
        />
        <TextInput
          value={note.content}
          onChangeText={(text) => onChange('content', text)}
          placeholder="Nhập gì đó"
          multiline={true}
        />
      </View>
      <BottomPopup
        show={showChooseFolder}
        onClose={() => setShowChooseFolder(false)}>
        <ChooseFolder />
      </BottomPopup>
      <BottomPopup show={showSetTime} onClose={() => setShowSetTime(false)}>
        <SetTime />
      </BottomPopup>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
