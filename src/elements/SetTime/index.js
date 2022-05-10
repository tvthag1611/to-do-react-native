import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function SetTime({setTime, time, setShowSetTime}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (time) {
      setDate(new Date(time));
    }
  }, [time]);

  return (
    <View>
      <Text style={styles.title}>Vui lòng cài thời gian</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'white'}]}
          onPress={() => setOpen(true)}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {date.toLocaleString('vi')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.button, styles.buttonDelete]}
          onPress={() => {
            setTime('dateSet', null);
            setShowSetTime(false);
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Xoá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSave]}
          onPress={() => {
            setTime('dateSet', date);
            setShowSetTime(false);
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
