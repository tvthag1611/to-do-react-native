import React, {createRef, useState} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const BottomPopup = ({show, onClose, children}) => {
  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={onClose}>
      <View style={styles.content}>
        {renderOutsideTouchable(onClose)}
        <View style={styles.wrapper}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  wrapper: {
    padding: 20,
    backgroundColor: '#5FADA0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomPopup;
