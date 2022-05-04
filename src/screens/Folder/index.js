import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoSmall from '../../assets/logo_smaill.png';
import Plus from '../../assets/plus.png';
import BottomPopup from '../../elements/BottomPopup';
import FolderItem from '../../elements/FolderItem';
import CreateNewFolder from '../../elements/CreateNewFolder';
import SetTime from '../../elements/SetTime';
import ChooseFolder from '../../elements/ChooseFolder';
import {BASE_URL} from '../../utils/config';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

const Folder = ({navigation}) => {
  const folders = [
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      name: 'Công việc',
      numberOfNotes: 10,
    },
    {
      plusFolder: true,
    },
  ];

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {token} = useContext(AuthContext);

  const getListFolders = async () => {
    const res = await axios.get(`${BASE_URL}/folder`, {
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
    getListFolders().then(() => setRefreshing(false));
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

  return (
    <SafeAreaView style={styles.folders}>
      <View style={styles.folderHeader}>
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableWithoutFeedback>
        <Image source={LogoSmall} />
      </View>
      <Text style={styles.text}>Folders</Text>
      <FlatList
        style={styles.list}
        data={folders}
        numColumns={2}
        renderItem={({item}) => {
          if (item.plusFolder) {
            return (
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={styles.plus}>
                <Image source={Plus} />
              </TouchableOpacity>
            );
          }
          return <FolderItem {...item} navigation={navigation} />;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={getListFolders}
        onEndReachedThreshold={0.5}
      />
      <BottomPopup show={show} onClose={() => setShow(false)}>
        <CreateNewFolder />
      </BottomPopup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  folders: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  folderHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
  },
  list: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  plus: {
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
});

export default Folder;
