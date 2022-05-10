import {Link} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/logo.png';

export default function Begin({navigation}) {
  return (
    <SafeAreaView style={styles.begin}>
      <Text style={styles.title}>Bắt đầu thôi</Text>
      <View style={styles.box}>
        <Image source={Logo} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tạo tài khoản</Text>
        </TouchableOpacity>
        <Text>
          Bạn đã có tài khoản chưa?{' '}
          <Link style={{fontWeight: 'bold'}} to="/Login">
            Đăng nhập
          </Link>
        </Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#9ECCF6'}]}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Tiếp tục với Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  begin: {
    flex: 1,
    backgroundColor: '#5FADA0',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 50,
    color: 'white',
  },
  box: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F6C09E',
    marginVertical: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
