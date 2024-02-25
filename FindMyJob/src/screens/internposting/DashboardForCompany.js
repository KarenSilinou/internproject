import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {BG_COLOR} from '../../utils/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale} from 'react-native-size-matters';

const DashboardForCompany = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}></View>
    </SafeAreaView>
  );
};

export default DashboardForCompany;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: BG_COLOR,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOpacity: 1,
    shadowOffset: {x: 0, y: 1},
  },
});
