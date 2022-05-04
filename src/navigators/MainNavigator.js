import React, {useContext} from 'react';
import HomeNavigator from './HomeNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FolderNavigator from './FolderNavigator';
import ProfileNavigator from './ProfileNavigator';
import DrawerContent from '../elements/Drawer';
import NoteNavigator from './NoteNavigator';
import NoteInFolderNavigator from './NoteInFolderNavigator';
import BeginNavigator from './BeginNavigator';
import LoginNavigator from './LoginNavigator';
import RegisterNavigator from './RegisterNavigator';
import {AuthContext} from '../context/AuthContext';

const Drawer = createDrawerNavigator();
export default function MainNavigator() {
  const {token} = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName={token ? 'Home' : 'Begin'}
      drawerContent={(props) => <DrawerContent {...props} />}>
      {token ? (
        <>
          <Drawer.Screen name="Home" component={HomeNavigator} />
          <Drawer.Screen name="Profile" component={ProfileNavigator} />
          <Drawer.Screen name="Folder" component={FolderNavigator} />
          <Drawer.Screen name="Note" component={NoteNavigator} />
          <Drawer.Screen
            name="NoteInFolder"
            component={NoteInFolderNavigator}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Begin" component={BeginNavigator} />
          <Drawer.Screen name="Login" component={LoginNavigator} />
          <Drawer.Screen name="Register" component={RegisterNavigator} />
        </>
      )}
    </Drawer.Navigator>
  );
}
