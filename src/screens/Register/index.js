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
import {AuthContext} from '../../context/AuthContext';
import LoadingOverlay from '../../elements/LoadingOverlay';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [otp, setOtp] = useState('');

  const {isLoading, verifyOtp, isVerifyOtp, register} = useContext(AuthContext);

  const handleRegister = () => {
    register(name, username, email, password);
  };

  const completeRegist = async () => {
    const res = await verifyOtp(otp);
    if (res) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.begin}>
      {isLoading && <LoadingOverlay />}
      <Text style={styles.title}>
        {isVerifyOtp ? 'Xác nhận OTP' : 'Tạo tài khoản'}
      </Text>
      {isVerifyOtp ? (
        <View style={{marginHorizontal: 20}}>
          <TextInput
            style={styles.input}
            onChangeText={setOtp}
            value={otp}
            placeholder="Nhập otp"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={completeRegist}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{marginHorizontal: 20}}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Họ và tên"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Đăng ký</Text>
          </TouchableOpacity>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Nếu bạn đã có tài khoản?{' '}
            <Link style={{fontWeight: 'bold'}} to="/Login">
              Đăng nhập
            </Link>
          </Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#9ECCF6'}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Tiếp tục với Google
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
