import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import TodoItem from '../../elements/TodoItem';
import {getAllNoteInFolderAsync} from '../../store/folder';

export default function NoteInFolder({route, navigation}) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, noteInFolder} = useSelector((state) => state.folderReducer);

  useEffect(() => {
    dispatch(getAllNoteInFolderAsync(route.params.folder.id));
  }, [dispatch, route.params.folder.id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllNoteInFolderAsync(route.params.folder.id)).then(() =>
      setRefreshing(false),
    );
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
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
        <Text style={styles.title}>{route.params.folder.name}</Text>
      </View>
      <FlatList
        style={{padding: 20}}
        data={noteInFolder}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<Text>Không có note nào cả</Text>}
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
