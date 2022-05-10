import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TodoItem from '../../elements/TodoItem';
import LogoSmall from '../../assets/logo_smaill.png';
import ButtonAdd from '../../elements/ButtonAdd';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllNotesAsync,
  searchAllNotesAsync,
  setItemNotes,
} from '../../store/notes';

export default function Home({navigation}) {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, searchedNotes} = useSelector((state) => state.noteReducer);

  console.log(searchedNotes);

  useEffect(() => {
    dispatch(getAllNotesAsync());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllNotesAsync()).then(() => setRefreshing(false));
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

  const onSearch = async (value) => {
    setSearchText(value);
    await dispatch(searchAllNotesAsync(value));
  };

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.homeTop}>
        <View style={styles.topHeader}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} />
          </TouchableWithoutFeedback>
          <Image source={LogoSmall} />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onSearch}
          value={searchText}
          placeholder="Search"
        />
      </View>
      <FlatList
        style={{padding: 20}}
        data={searchedNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setItemNotes({noteItem: item}));
              navigation.navigate('Note');
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
      <ButtonAdd navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  homeTop: {
    backgroundColor: '#5FADA0',
    padding: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 40,
  },
  topHeader: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 0,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: 'white',
  },
});
