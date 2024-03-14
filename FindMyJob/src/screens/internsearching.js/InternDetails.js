import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE1} from '../../utils/Colors';

const InternDetails = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [savedInternId, setSavedInternId] = useState('');
  const [appliedInternId, setAppliedInternId] = useState('');
  const [isInternSaved, setIsInternSaved] = useState(false);
  const [isInternApplied, setIsInternApplied] = useState(false);

  useEffect(() => {
    getData();
    getSavedInterns();
    getAppliedInterns();
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

  const saveInterns = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('save_interns')
      .add({
        ...route.params.data,
        userId: id,
      })
      .then(() => {
        console.log('intern saved successfully');
        getSavedInterns();
      });
  };

  const applyIntern = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('applied_interns')
      .add({
        ...route.params.data,
        userId: id,
      })
      .then(() => {
        console.log('intern applied successfully');
        getAppliedInterns();
      });
  };

  const getSavedInterns = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_interns')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(item => {
            if (item.data().id == route.params.data.id) {
              setIsInternSaved(true);
              setSavedInternId(item.id);
            }
          });
        } else {
          setIsInternSaved(false);
          setSavedInternId('');
        }
      });
  };

  const getAppliedInterns = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('applied_interns')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(item => {
            if (item.data().id == route.params.data.id) {
              setIsInternApplied(true);
              setAppliedInternId(item.id);
            }
          });
        } else {
          setIsInternApplied(false);
          setAppliedInternId('');
        }
      });
  };

  const removeSavedIntern = () => {
    firestore()
      .collection('saved_interns')
      .doc(savedInternId)
      .delete()
      .then(() => {
        getSavedInterns();
      });
  };

  const cancelApply = () => {
    firestore()
      .collection('applied_interns')
      .doc(appliedInternId)
      .delete()
      .then(() => {
        getAppliedInterns();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.data.internTitle}</Text>
      <View style={styles.detailsView}>
        <Text>{'Poster par: ' + route.params.data.posterName}</Text>
      </View>
      <Text style={styles.desc}>{route.params.data.internDesc}</Text>
      <Text style={styles.subTitle}>
        {'Competence requise: ' + route.params.data.skill}
      </Text>
      <Text style={styles.subTitle}>
        {'Entreprise: ' + route.params.data.company}
      </Text>
      <Text style={styles.subTitle}>
        {'Durée: ' + route.params.data.internTime + ' Mois'}
      </Text>
      <Text style={styles.subTitle}>
        {'Catégorie: ' + route.params.data.category}
      </Text>
      <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={!isLogin}
          style={styles.saveBtn}
          onPress={() => {
            if (isInternSaved) {
              removeSavedIntern();
            } else {
              saveInterns();
            }
          }}>
          <Image
            source={
              isInternSaved
                ? require('../../images/star1.png')
                : require('../../images/star.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isLogin}
          style={[
            styles.applyBtn,
            {backgroundColor: isLogin ? '#00B5E8' : '#9e9e9e'},
          ]}
          onPress={() => {
            if (!isInternApplied) {
              applyIntern();
            } else {
              cancelApply();
            }
          }}>
          <Text style={styles.btnText}>
            {isInternApplied ? 'Vous avez postule' : 'Postuler pour le stage'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '700',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  desc: {
    width: '90%',
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: '500',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: moderateScale(20),
    fontWeight: '500',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(20),
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  bottomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: moderateScale(30),
  },
  saveBtn: {
    width: '25%',
    height: verticalScale(35),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  applyBtn: {
    width: '70%',
    height: scale(40),
    backgroundColor: TEXT_BLUE1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
  },
});

export default InternDetails;
