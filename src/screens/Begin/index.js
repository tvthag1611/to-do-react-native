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
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {useDispatch} from 'react-redux';
import {loginGoogleAsync} from '../../store/auth';

export default function Begin({navigation}) {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const res = await dispatch(loginGoogleAsync(idToken));
      if (res) {
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

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
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#9ECCF6'}]}
          onPress={signIn}>
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
