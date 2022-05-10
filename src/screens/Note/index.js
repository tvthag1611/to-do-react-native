import React, {useEffect, useState} from 'react';
import {
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
import {useDispatch, useSelector} from 'react-redux';
import {
  createNoteAsync,
  deleteNoteAsync,
  editNoteAsync,
} from '../../store/notes';

export default function Note({navigation}) {
  const dispatch = useDispatch();

  const [note, setNote] = useState({
    title: '',
    description: '',
    folder: null,
    dateSet: null,
    dateCreate: new Date(),
  });

  const [showChooseFolder, setShowChooseFolder] = useState(false);
  const [showSetTime, setShowSetTime] = useState(false);

  const {noteItem} = useSelector((state) => state.noteReducer);

  console.log(noteItem);

  useEffect(() => {
    if (noteItem) {
      setNote(noteItem);
      console.log(noteItem);
    } else {
      setNote({
        title: '',
        description: '',
        folder: null,
        dateSet: null,
        dateCreate: new Date(),
      });
    }
  }, [noteItem]);

  const onChange = (name, value) => {
    setNote({
      ...note,
      [name]: value,
    });
  };

  const onEdit = async () => {
    const res = await dispatch(editNoteAsync(note));

    if (res) {
      navigation.navigate('Home');
    }
  };

  const onCreate = async () => {
    console.log(note);
    const res = await dispatch(createNoteAsync(note));

    if (res) {
      navigation.navigate('Home');
    }
  };

  const onDelete = async () => {
    const res = await dispatch(deleteNoteAsync(note.id));

    if (res) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
            navigation.setParams({noteItem: null});
          }}>
          <Icon name="left" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setShowChooseFolder(true)}>
          <Icon name="folder1" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setShowSetTime(true)}>
          <Icon name="bells" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onDelete} disabled={!noteItem}>
          <Icon name="delete" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={noteItem ? onEdit : onCreate}
          disabled={!note.title || !note.description}>
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
          value={note.description}
          onChangeText={(text) => onChange('description', text)}
          placeholder="Nhập gì đó"
          multiline={true}
        />
      </View>
      <BottomPopup
        show={showChooseFolder}
        onClose={() => setShowChooseFolder(false)}>
        <ChooseFolder setFolder={onChange} folder={note.folder} />
      </BottomPopup>
      <BottomPopup show={showSetTime} onClose={() => setShowSetTime(false)}>
        <SetTime
          setTime={onChange}
          time={note.dateSet}
          setShowSetTime={setShowSetTime}
        />
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
