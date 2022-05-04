import {Link} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/logo.png';
import {AuthContext} from '../../context/AuthContext';
import LoadingOverlay from '../../elements/LoadingOverlay';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, login} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.begin}>
      {isLoading && <LoadingOverlay />}
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={{marginHorizontal: 20}}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const res = await login(username, password);
            if (res) {
              navigation.navigate('Home');
            }
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Nếu bạn chưa có tài khoản?{' '}
          <Link style={{fontWeight: 'bold'}} to="/Register">
            Tạo tài khoản
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
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 50,
    color: 'white',
  },
  input: {
    height: 50,
    borderWidth: 0,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    marginBottom: 20,
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
