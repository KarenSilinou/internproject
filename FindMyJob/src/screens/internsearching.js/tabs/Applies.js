import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Applies = () => {
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
            'Pour avoir la trace de vos demandes de stage vous devez creer un compte'
          }
          heading={'Une place pour traquer toutes vos demandes'}
        />
      )}
    </View>
  );
};

export default Applies;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
