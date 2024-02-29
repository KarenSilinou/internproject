import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE, TEXT_COLOR} from '../../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ProfileOptionItem from '../../../common/ProfileOptionItem';

const Profile1 = ({onInternsClick}) => {
  const [name, setName] = useState('');
  const [interns, setInterns] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    setName(await AsyncStorage.getItem('NAME'));
    setInterns(await AsyncStorage.getItem('INTERNS'));
    let img = await AsyncStorage.getItem('PROFILE_IMAGE');
    console.log(img);
    if (img != null) {
      setProfileImg();
    }
  };
  return (
    <View>
      <Text style={styles.heading}>INTERNGLOBE</Text>
      <TouchableOpacity>
        {profileImg != '' ? (
          <Image source={{uri: profileImg}} style={styles.profileImg} />
        ) : (
          <Image
            source={require('../../../images/profile.png')}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate('UpdateProfileForCompany');
        }}>
        Modifier le profil
      </Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate('ChangeProfilePicForCompany');
        }}>
        Modifier la photo de profile
      </Text>
      <View style={styles.optionArea}>
        <ProfileOptionItem
          icon={require('../../../images/intern.png')}
          title={'Mes offres (' + interns + ')'}
          onClick={() => {
            onInternsClick();
          }}
        />
        <ProfileOptionItem
          icon={require('../../../images/contact.png')}
          title={'Contactez nous'}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require('../../../images/theme.png')}
          title={'Theme'}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require('../../../images/logout.png')}
          title={'Deconnexion'}
          onClick={() => {}}
        />
      </View>
    </View>
  );
};

export default Profile1;
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
  profileImg: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  changeProfilePic: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: moderateScale(10),
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
  },
  name: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  optionArea: {
    marginTop: moderateVerticalScale(70),
  },
});
