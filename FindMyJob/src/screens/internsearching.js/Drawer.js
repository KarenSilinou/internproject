import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {BG_COLOR} from '../../utils/Colors';

const DrawerScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.bottomNavView}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(0);
          }}>
          <Image
            source={
              currentTab == 0
                ? require('../../images/home.png')
                : require('../../images/home1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(1);
          }}>
          <Image
            source={
              currentTab == 1
                ? require('../../images/send.png')
                : require('../../images/send1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(2);
          }}>
          <Image
            source={
              currentTab == 2
                ? require('../../images/chat.png')
                : require('../../images/chat1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(3);
          }}>
          <Image
            source={
              currentTab == 3
                ? require('../../images/user.png')
                : require('../../images/user1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomNavView: {
    width: '100%',
    height: moderateScale(80),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopWidth: 0.3,
    borderTopColor: '#9e9e9e',
  },
  tab: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: scale(24),
    height: scale(24),
  },
});
