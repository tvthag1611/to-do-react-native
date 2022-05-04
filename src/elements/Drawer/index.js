import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';

export default function DrawerContent(props) {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableRipple
            onPress={() => {
              props.navigation.navigate('Profile');
            }}>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',
                  }}
                  size={50}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title style={styles.title}>Trần Văn Thắng</Title>
                  <Caption style={styles.caption}>Xem profile</Caption>
                </View>
              </View>
            </View>
          </TouchableRipple>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              labelStyle={{fontSize: 18, fontWeight: 'bold'}}
            />
            <DrawerItem
              label="Folders"
              onPress={() => {
                props.navigation.navigate('Folder');
              }}
              labelStyle={{fontSize: 18, fontWeight: 'bold'}}
            />
            <DrawerItem
              label="Đăng xuất"
              onPress={() => {
                logout();
                props.navigation.closeDrawer();
              }}
              labelStyle={{fontSize: 18, fontWeight: 'bold'}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  drawerSection: {
    marginTop: 15,
  },
});
