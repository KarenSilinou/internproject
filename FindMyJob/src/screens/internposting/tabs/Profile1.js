import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import ProfileOptionItem from '../../../common/ProfileOptionItem';
import {BG_COLOR, TEXT_BLUE, TEXT_COLOR} from '../../../utils/Colors';

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
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('NAME');
      await AsyncStorage.removeItem('INTERNS');
      await AsyncStorage.removeItem('PROFILE_IMAGE');
      // Ajoutez d'autres éléments à supprimer si nécessaire

      // Rediriger vers la page SelectUser
      navigation.navigate('SelectUser');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
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
          title={'Déconnexion'}
          onClick={handleLogout}
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
