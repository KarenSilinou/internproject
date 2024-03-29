import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE1, TEXT_COLOR} from '../../utils/Colors';

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Que voulez vous ?</Text>
      <TouchableOpacity
        style={styles.wantToHire}
        onPress={() => {
          navigation.navigate('InternPostingNavigator');
        }}>
        <Text style={[styles.btnTxt1, {color: BG_COLOR}]}>
          Poster une offre de stage
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wantToIntern}
        onPress={() => {
          navigation.navigate('InternSearchingNavigator');
        }}>
        <Text style={styles.btnTxt2}>Postuler pour une offre de stage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  wantToHire: {
    width: '90%',
    height: verticalScale(45),
    backgroundColor: TEXT_BLUE1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  wantToIntern: {
    width: '90%',
    height: verticalScale(45),
    borderWidth: 1,
    borderColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  btnTxt1: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: TEXT_COLOR,
  },
  btnTxt2: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: TEXT_COLOR,
  },
  logo: {
    width: scale(200),
    height: scale(200),
    marginBottom: moderateVerticalScale(50),
  },
});
