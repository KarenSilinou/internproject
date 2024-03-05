import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE1} from '../utils/Colors';
import CustomSolidBtn from './CustomSolidBtn';

const NoLoginComponent = ({heading, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading ? heading : ''}</Text>
      <Text style={styles.desc}>{desc ? desc : ''}</Text>
      <CustomSolidBtn title={'Se Connecter'} onClick={() => {}} />
      <View style={styles.signUpView}>
        <Text style={styles.text1}>{"Vous n'avez pas de compte ?"}</Text>
        <Text style={styles.text2}>{" S'inscrire"}</Text>
      </View>
    </View>
  );
};

export default NoLoginComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(100),
    fontWeight: '700',
    textAlign: 'center',
  },
  desc: {
    width: '80%',
    alignSelf: 'center',
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  signUpView: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(50),
    justifyContent: 'center',
  },
  text1: {
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
  text2: {
    fontWeight: '700',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
    color: TEXT_BLUE1,
  },
});
