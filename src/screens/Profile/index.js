import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile({navigation}) {
  const [profile, setProfile] = useState({
    name: 'Trần Văn Thắng',
    avatar:
      'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',
    email: 'thangquyvanthao2000@gmail.com',
  });

  const [isChangePassword, setIsChangePassword] = useState(false);

  const onChange = (name, value) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.top}>
        <View style={styles.topContent}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} style={{marginBottom: 10}} />
          </TouchableWithoutFeedback>
          <Text style={styles.text}>Xin chào,</Text>
          <Text style={styles.text}>{profile.name}</Text>
        </View>
        <Image
          source={{
            uri: profile.avatar,
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.text, {textAlign: 'center'}]}>
          {isChangePassword ? 'Thay đổi mật khẩu' : 'Thông tin cơ bản'}
        </Text>
        <View style={styles.infoBox}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChange('name', value)}
            value={profile.name}
            placeholder="Họ và tên"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChange('email', value)}
            value={profile.email}
            placeholder="Email"
          />
          <TouchableOpacity style={styles.button} disabled>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsChangePassword(!isChangePassword)}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {isChangePassword ? 'Cancel' : 'Đổi mật khẩu'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#5FADA0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    padding: 20,
    marginTop: -30,
  },
  infoBox: {
    borderRadius: 30,
    backgroundColor: '#C5DEE2',
    padding: 20,
    marginVertical: 20,
  },
});
