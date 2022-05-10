import React from 'react';
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
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();
export default function MainNavigator() {
  const {isAuthenticated} = useSelector((state) => state.authReducer);
  return (
    <Drawer.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Begin'}
      drawerContent={(props) => <DrawerContent {...props} />}>
      {isAuthenticated ? (
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
