import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE} from '../../utils/Colors';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  const getData = async () => {
    let type = await AsyncStorage.getItem('USER_TYPE');
    if (type !== null) {
      if (type === 'company') {
        navigation.navigate('DashboardForCompany');
      } else {
        navigation.navigate('Main');
      }
    } else {
      navigation.navigate('SelectUser');
    }
    // Ajout d'une redirection forcée vers 'SelectUser' pour assurer la redirection
    navigation.navigate('SelectUser');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>Poster et Trouver votre stage</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(300),
    height: verticalScale(300),
  },
  slogan: {
    fontSize: moderateScale(16),
    position: 'absolute',
    bottom: moderateVerticalScale(80),
    color: TEXT_BLUE,
  },
});
