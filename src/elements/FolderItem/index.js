import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import BottomPopup from '../BottomPopup';
import CreateNewFolder from '../CreateNewFolder';

const FolderItem = ({name, numberOfNotes, navigation}) => {
  const [show, setShow] = useState(false);
  const [nameFolder, setNameFolder] = useState(name);

  const onLongPress = () => {
    setShow(true);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NoteInFolder', {
          screen: 'NoteInFolder',
          params: {name},
        });
      }}
      onLongPress={onLongPress}
      style={styles.folder}>
      <Text style={styles.name}>{name}</Text>
      <Text>{numberOfNotes} notes</Text>
      <BottomPopup show={show} onClose={() => setShow(false)}>
        <View>
          <Text style={styles.title}>Tạo folder mới</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNameFolder}
            value={nameFolder}
            placeholder="Tên folder"
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Xoá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSave]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomPopup>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  folder: {
    width: '50%',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#C5DEE2',
    marginBottom: 20,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 50,
    borderWidth: 0,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexGrow: 1,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDelete: {
    backgroundColor: '#F69E9E',
    marginRight: 30,
  },
  buttonSave: {
    backgroundColor: '#9ECCF6',
  },
});

export default FolderItem;
