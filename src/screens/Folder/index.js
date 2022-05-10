import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {getAllFolderAsync} from '../../store/folder';

const Folder = ({navigation}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, folders} = useSelector((state) => state.folderReducer);

  useEffect(() => {
    dispatch(getAllFolderAsync());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllFolderAsync()).then(() => setRefreshing(false));
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
          return <FolderItem folder={item} navigation={navigation} />;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
      />
      <BottomPopup show={show} onClose={() => setShow(false)}>
        <CreateNewFolder setShow={setShow} />
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
