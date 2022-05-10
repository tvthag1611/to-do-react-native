import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createFolderAsync} from '../../store/folder';

const CreateNewFolder = ({setShow}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const onCreate = async () => {
    const res = await dispatch(createFolderAsync({name}));
    if (res) {
      setShow(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Tạo folder mới</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Tên folder"
      />
      <TouchableOpacity style={styles.button} onPress={onCreate}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tạo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  button: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F6C09E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default CreateNewFolder;
