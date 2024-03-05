import React from 'react';
import {StyleSheet, View} from 'react-native';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Applies = () => {
  return (
    <View style={styles.container}>
      <NoLoginComponent
        desc={
          'Pour avoir la trace de vos demandes de stage vous devez creer un compte'
        }
        heading={'Une place pour traquer toutes vos demandes'}
      />
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
