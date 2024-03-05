import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE1} from '../../utils/Colors';

const CustomDrawer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          source={require('../../images/userPlaceholder.png')}
          style={styles.profile}
        />
        <View>
          <Text style={styles.heading}>Creer votre profil</Text>
          <Text style={styles.sub_heading}>
            Le stage n'attend que vous sur INTERNGLOBE !
          </Text>
        </View>
      </View>
      <View style={styles.btnsView}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={[styles.btnText, {color: BG_COLOR}]}>Se Connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn}>
          <Text style={styles.btnText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <FlatList
        contentContainerStyle={{marginTop: moderateScale(50)}}
        data={[
          {title: 'Evaluez-nous', icon: require('../../images/rate.png')},
          {title: 'Theme', icon: require('../../images/theme.png')},
        ]}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeftView}>
                <Image source={item.icon} style={styles.menuItemIcon} />
                <Text style={styles.heading}>{item.title}</Text>
              </View>
              <Image
                source={require('../../images/right.png')}
                style={styles.menuItemIcon}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  profile: {
    width: scale(50),
    height: scale(50),
    marginLeft: moderateScale(10),
  },
  topView: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
  },
  heading: {
    fontSize: 18,
    width: '70%',
    fontWeight: '700',
    marginLeft: moderateScale(10),
  },
  sub_heading: {
    fontSize: moderateScale(8.5),
    width: '60%',
    marginLeft: moderateScale(10),
    marginTop: moderateScale(4),
  },
  btnsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  loginBtn: {
    width: '40%',
    height: verticalScale(30),
    backgroundColor: TEXT_BLUE1,
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    width: '40%',
    height: verticalScale(30),
    borderColor: TEXT_BLUE1,
    borderWidth: 1,
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '500',
    fontSize: moderateScale(10),
  },
  separator: {
    width: '90%',
    height: verticalScale(0.5),
    opacity: 0.5,
    backgroundColor: '#9e9e9e',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  menuItem: {
    width: '90%',
    alignSelf: 'center',
    height: verticalScale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: scale(24),
    height: scale(24),
  },
});
