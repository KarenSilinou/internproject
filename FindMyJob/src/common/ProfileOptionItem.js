import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={icon} style={{width: scale(20), height: scale(20)}} />
        <Text style={{marginLeft: moderateScale(15)}}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ProfileOptionItem;
