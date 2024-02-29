import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE, TEXT_BLUE1, TEXT_COLOR} from '../utils/Colors';

const CustomBorderBtn = ({title, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        onClick();
      }}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBorderBtn;
const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: verticalScale(40),
    borderColor: TEXT_BLUE1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: TEXT_BLUE1,
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
});
