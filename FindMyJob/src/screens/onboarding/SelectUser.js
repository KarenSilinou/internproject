import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {BG_COLOR, TEXT_BLUE1, TEXT_COLOR} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Que voulez vous ?</Text>
      <Pressable
        style={styles.wantToHire}
        onPress={() => {
          navigation.navigate('InternPostingNavigator');
        }}>
        <Text style={styles.btnTxt1}>Poster une offre de stage</Text>
      </Pressable>
      <Pressable style={styles.wantToJob}>
        <Text style={styles.btnTxt2}>Postuler pour une offre de stage</Text>
      </Pressable>
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
  wantToJob: {
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
