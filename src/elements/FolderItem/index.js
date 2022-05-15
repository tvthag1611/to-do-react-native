import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteFolderAsync, editFolderAsync} from '../../store/folder';
import BottomPopup from '../BottomPopup';

const FolderItem = ({folder, navigation}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [folderItem, setFolderItem] = useState(folder);

  useEffect(() => {
    setFolderItem(folder);
  }, [folder]);

  console.log(folderItem);

  const onLongPress = () => {
    setShow(true);
  };

  const onEdit = async () => {
    const res = await dispatch(editFolderAsync(folderItem));
    if (res) {
      setShow(false);
    }
  };

  const onDelete = async () => {
    const res = await dispatch(deleteFolderAsync(folderItem.id));
    if (res) {
      setShow(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NoteInFolder', {
          screen: 'NoteInFolder',
          params: {folder: folderItem},
        });
      }}
      onLongPress={onLongPress}
      style={styles.folder}>
      <Text style={styles.name}>{folderItem.name}</Text>
      <BottomPopup show={show} onClose={() => setShow(false)}>
        <View>
          <Text style={styles.title}>Sửa folder</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setFolderItem({...folderItem, name: value})
            }
            value={folderItem?.name}
            placeholder="Tên folder"
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={onDelete}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Xoá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={onEdit}>
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
    width: 176,
    height: 120,
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
