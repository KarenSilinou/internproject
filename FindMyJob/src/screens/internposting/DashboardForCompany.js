import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR} from '../../utils/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, verticalScale} from 'react-native-size-matters';
import MyInterns from './tabs/MyIntern';
import SearchCandidates from './tabs/SearchCandidates';
import Chats from './tabs/Chats';
import Profile1 from './tabs/Profile1';
import {useNavigation} from '@react-navigation/native';

const DashboardForCompany = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {selectedTab == 0 ? (
        <MyInterns />
      ) : selectedTab == 1 ? (
        <SearchCandidates />
      ) : selectedTab == 2 ? (
        <Chats />
      ) : (
        <Profile1 />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 0 ? 3 : 0,
              borderTopColor: '#00B5E8',
            },
          ]}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../../images/home1.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? '#00B5E8' : '#017DC0'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 1 ? 3 : 0,
              borderTopColor: '#00B5E8',
            },
          ]}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../../images/search-user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? '#00B5E8' : '#017DC0'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            //setSelectedTab(2);
            navigation.navigate('AddIntern');
          }}>
          <Image
            source={require('../../images/addition.png')}
            style={[styles.tabIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 2 ? 3 : 0,
              borderTopColor: '#00B5E8',
            },
          ]}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../../images/chat.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 2 ? '#00B5E8' : '#017DC0'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 3 ? 3 : 0,
              borderTopColor: '#00B5E8',
            },
          ]}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../../images/user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 3 ? '#00B5E8' : '#017DC0'},
            ]}
          />
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: scale(24),
    height: scale(24),
  },
});
