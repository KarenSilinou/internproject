import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE, TEXT_COLOR} from '../../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import ProfileOptionItem from '../../../common/ProfileOptionItem';

const Profile1 = () => {
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    setName(await AsyncStorage.getItem('NAME'));
  };
  return (
    <View>
      <Text style={styles.heading}>INTERNGLOBE</Text>
      <Pressable>
        <Image
          source={require('../../../images/profile.png')}
          style={styles.profileImg}
        />
      </Pressable>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.changeProfilePic}>Modifier le profile</Text>
      <Text style={styles.changeProfilePic}>Modifier la photo de profile</Text>
      <ProfileOptionItem
        icon={require('../../../images/intern.png')}
        title={'Mes offres'}
      />
      <ProfileOptionItem
        icon={require('../../../images/contact.png')}
        title={'Contactez nous'}
      />
      <ProfileOptionItem
        icon={require('../../../images/theme.png')}
        title={'Theme'}
      />
      <ProfileOptionItem
        icon={require('../../../images/logout.png')}
        title={'Deconnexion'}
      />
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
});
