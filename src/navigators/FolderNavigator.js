import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Folder from '../screens/Folder';

const FolderStack = createStackNavigator();

export default function FolderNavigator() {
  return (
    <FolderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <FolderStack.Screen name="Folder" component={Folder} />
    </FolderStack.Navigator>
  );
}
