import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Note from '../screens/Note';

const NoteStack = createStackNavigator();

export default function NoteNavigator() {
  return (
    <NoteStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <NoteStack.Screen name="Note" component={Note} />
    </NoteStack.Navigator>
  );
}
