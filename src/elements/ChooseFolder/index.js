import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ChooseFolder() {
  const [folders, setFolders] = useState([
    {
      name: 'Công việc',
    },
    {
      name: 'Học tập',
    },
    {
      name: 'Hoạt động',
    },
  ]);

  const [folderChoose, setFolderChoose] = useState({});

  const chooseFolder = (item) => {
    setFolderChoose(item);
  };

  return (
    <View>
      <FlatList
        data={folders}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => chooseFolder(item)}>
            <View style={styles.button}>
              <Text style={{fontSize: 16}}>{item.name}</Text>
              {folderChoose.name === item.name && (
                <Icon name="check" size={30} />
              )}
            </View>
          </TouchableOpacity>
        )}
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
