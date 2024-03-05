import React from 'react';
import {StyleSheet, View} from 'react-native';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Inbox = () => {
  return (
    <View style={styles.container}>
      <NoLoginComponent
        desc={'Discutez avec des entreprises pour avoir une recommandation'}
        heading={"Vous pouvez discuter avec l'entreprise"}
      />
    </View>
  );
};

export default Inbox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
