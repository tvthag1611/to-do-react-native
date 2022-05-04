import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NoteInFolder from '../screens/NoteInFolder';

const NoteInFolderStack = createStackNavigator();

export default function NoteInFolderNavigator() {
  return (
    <NoteInFolderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <NoteInFolderStack.Screen name="NoteInFolder" component={NoteInFolder} />
    </NoteInFolderStack.Navigator>
  );
}
