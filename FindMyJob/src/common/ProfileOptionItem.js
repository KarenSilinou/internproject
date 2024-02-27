import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {moderateVerticalScale, scale} from 'react-native-size-matters';

const ProfileOptionItem = ({title, icon, onClick}) => {
  return (
    <Pressable
      style={{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20),
      }}>
      <Image source={icon} style={{width: scale(16), height: scale(16)}} />
    </Pressable>
  );
};

export default ProfileOptionItem;
