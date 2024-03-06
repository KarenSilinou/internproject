import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Profile = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };
  return (
    <View style={styles.container}>
      {isLogin && (
        <NoLoginComponent
          desc={
            'Mettez les informations vous concernant pour mieux situer la compagnie'
          }
          heading={'Gerez votre profil ici...'}
        />
      )}
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
