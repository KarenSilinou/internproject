import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, scale} from 'react-native-size-matters';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR} from '../../../utils/Colors';

const Profile = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData();
    getProfileData();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');

    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };

  const getProfileData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    console.log('ID:', id);

    firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(data => {
        console.log('Data from Firestore:', data);
        if (data.exists) {
          console.log('Data exists:', data.data());
          setUserData(data.data());
        } else {
          console.log('Document does not exist');
        }
      })
      .catch(error => {
        console.error('Error fetching document:', error);
      });
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComponent
          desc={
            'Mettez les informations vous concernant pour mieux situer la compagnie'
          }
          heading={'Gérez votre profil ici...'}
        />
      )}
      {isLogin && (
        <View style={styles.mainView}>
          <TouchableOpacity style={{marginLeft: 20, marginTop: 20}}>
            <Image
              source={require('../../../images/userPlaceholder.png')}
              style={styles.profile}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{userData ? userData.name : 'NA'}</Text>
          <Text style={styles.email}>{userData ? userData.email : 'NA'}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text>Modifier le profil</Text>
          </TouchableOpacity>
          <View style={styles.headingView}>
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: '600',
                marginLeft: moderateScale(20),
              }}>
              {'Competences'}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: '600',
                marginLeft: moderateScale(20),
              }}>
              {'+'}
            </Text>
          </View>
        </View>
      )}
      <Modal isVisible backdropOpacity={0.5}>
        <View style={styles.skillModal}></View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  mainView: {
    flex: 1,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
  },
  email: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 5,
  },
  editBtn: {
    width: 200,
    height: 50,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  headingView: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(30),
    alignSelf: 'center',
  },
  skillModal: {
    width: '100%',
    height: scale(200),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
});
