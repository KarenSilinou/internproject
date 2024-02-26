import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {BG_COLOR, TEXT_BLUE} from '../../../utils/Colors';
import {moderateScale} from 'react-native-size-matters';

const MyJobs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>INTERNGLOBE</Text>
    </View>
  );
};

export default MyJobs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    marginLeft: moderateScale(10),
    fontWeight: '600',
    color: TEXT_BLUE,
  },
});
