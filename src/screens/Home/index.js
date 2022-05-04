import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TodoItem from '../../elements/TodoItem';
import LogoSmall from '../../assets/logo_smaill.png';
import ButtonAdd from '../../elements/ButtonAdd';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';

export default function Home({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {token} = useContext(AuthContext);

  const todoList = [
    {
      title: 'Yoga',
      content: 'This is yoga',
      folder: 'Công việc',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 2',
      content: 'This is yoga',
      folder: 'Công việc',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 3',
      folder: 'Công việc',
      content: 'This is yoga',
      time: '11 : 00 27/02/2022',
    },
    {
      title: 'Yoga 4',
      folder: 'Công việc',
      content: 'This is yoga',
      time: '11 : 00 27/02/2022',
    },
  ];

  const getListNotes = async () => {
    const res = await axios.get(`${BASE_URL}/note`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      console.log(res);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListNotes().then(() => setRefreshing(false));
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const onSearch = (value) => {
    setSearchText(value);
    // axios.
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
        data={todoList}
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
        onEndReached={getListNotes}
        onEndReachedThreshold={0.5}
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
