import React from 'react';
import {StyleSheet, View} from 'react-native';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Profile = () => {
  return (
    <View style={styles.container}>
      <NoLoginComponent
        desc={
          'Mettez les informations vous concernant pour mieux situer la compagnie'
        }
        heading={'Gerez votre profil ici...'}
      />
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
