import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFolderAsync} from '../../store/folder';

export default function ChooseFolder({setFolder, folder}) {
  const dispatch = useDispatch();

  const {folders} = useSelector((state) => state.folderReducer);

  console.log(folders);

  useEffect(() => {
    dispatch(getAllFolderAsync());
  }, [dispatch]);

  const chooseFolder = (item) => {
    setFolder('folder', item);
  };

  return (
    <View>
      <FlatList
        data={folders}
        renderItem={({item}) => {
          if (!item.plusFolder) {
            return (
              <TouchableOpacity onPress={() => chooseFolder(item)}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                  {folder?.id === item.id && <Icon name="check" size={30} />}
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F6C09E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
