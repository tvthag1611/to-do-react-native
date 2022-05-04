import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function SetTime() {
  return (
    <View>
      <Text style={styles.title}>Vui lòng cài thời gian</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Xoá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSave]}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexGrow: 1,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDelete: {
    backgroundColor: '#F69E9E',
    marginRight: 30,
  },
  buttonSave: {
    backgroundColor: '#9ECCF6',
  },
});
