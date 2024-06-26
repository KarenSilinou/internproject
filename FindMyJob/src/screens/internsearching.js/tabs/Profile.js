import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, scale} from 'react-native-size-matters';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR, TEXT_BLUE} from '../../../utils/Colors';

const Profile = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openSkillModal, setSkillModal] = useState(false);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [skill, setSkill] = useState('');
  const [skillsList, setSkillsList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [education, setEducation] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [diplome, setDiplome] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getProfileData();
    getSkills();
    getEducationList();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    if (id && type && type === 'user') {
      setIsLogin(true);
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
        console.log(data.data());
        setUserData(data.data());
      });
  };

  const addSkill = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('skills')
      .add({
        skill: skill,
        userId: id,
      })
      .then(() => {
        Alert.alert('Compétence ajoutée');
        setSkill('');
        getSkills();
      });
  };

  const addEducation = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('education')
      .add({
        education: education,
        startYear: startYear,
        endYear: endYear,
        diplome: diplome,
        userId: id,
      })
      .then(() => {
        Alert.alert('Formation ajoutée');
        setEducation('');
        setStartYear('');
        setEndYear('');
        setDiplome('');
        getEducationList();
      });
  };

  const getSkills = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('skills')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), skillId: item.id});
        });
        setSkillsList(temp);
        console.log(snapshot.docs);
      });
  };

  const getEducationList = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('education')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), educId: item.id});
        });
        setEducationList(temp);
        console.log(snapshot.docs);
      });
  };

  const deleteSkill = id => {
    firestore().collection('skills').doc(id).delete();
    getSkills();
  };

  const deleteEducation = id => {
    firestore().collection('education').doc(id).delete();
    getEducationList();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('USER_ID');
      await AsyncStorage.removeItem('USER_TYPE');
      navigation.navigate('SelectUser');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
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
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>

          <View style={styles.headingView}>
            <Text style={{fontSize: moderateScale(24), fontWeight: '600'}}>
              Compétences
            </Text>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: '600',
                marginLeft: moderateScale(20),
              }}
              onPress={() => setSkillModal(true)}>
              +
            </Text>
          </View>
          <FlatList
            data={skillsList}
            renderItem={({item}) => (
              <View style={styles.skillItem}>
                <Text style={styles.skillName}>{item.skill}</Text>
                <TouchableOpacity onPress={() => deleteSkill(item.skillId)}>
                  <Image
                    source={require('../../../images/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.skillId}
          />

          <View style={{...styles.headingView, marginTop: moderateScale(0)}}>
            <Text
              style={{
                fontSize: moderateScale(24),
                fontWeight: '600',
                marginTop: moderateScale(-150),
              }}>
              Formation
            </Text>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: '600',
                marginLeft: moderateScale(20),
                marginTop: moderateScale(-143),
              }}
              onPress={() => setOpenEducationModal(true)}>
              +
            </Text>
          </View>
          <FlatList
            data={educationList}
            renderItem={({item}) => (
              <View style={styles.skillItem}>
                <Text style={styles.skillName}>{item.education}</Text>
                <TouchableOpacity onPress={() => deleteEducation(item.educId)}>
                  <Image
                    source={require('../../../images/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.educId}
          />
        </View>
      )}
      <Modal
        isVisible={openSkillModal}
        backdropOpacity={0.5}
        style={{margin: 0}}>
        <View style={styles.skillModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Ajouter une compétence</Text>
            <TouchableOpacity onPress={() => setSkillModal(false)}>
              <Image
                source={require('../../../images/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Entrer la compétence"
            style={styles.input}
            value={skill}
            onChangeText={txt => setSkill(txt)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setSkillModal(false);
              if (skill !== '') {
                addSkill();
              }
            }}>
            <Text style={styles.btnText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={openEducationModal}
        backdropOpacity={0.5}
        style={{margin: 0}}>
        <View style={styles.skillModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Ajouter une formation</Text>
            <TouchableOpacity onPress={() => setOpenEducationModal(false)}>
              <Image
                source={require('../../../images/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Entrer l'établissement"
            style={styles.input}
            value={education}
            onChangeText={txt => setEducation(txt)}
          />
          <TextInput
            placeholder="Entrer l'année de début"
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            value={startYear}
            onChangeText={txt => setStartYear(txt)}
          />
          <TextInput
            placeholderTextColor={'#9e9e9e'}
            placeholder="Entrer l'annee de fin"
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            value={endYear}
            onChangeText={txt => setEndYear(txt)}
          />
          <TextInput
            placeholderTextColor={'#9e9e9e'}
            placeholder="Diplome obtenu"
            style={styles.input}
            value={diplome}
            onChangeText={txt => setDiplome(txt)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setOpenEducationModal(false);
              if (education != '' && startYear != '' && endYear != '') {
                addEducation();
              }
            }}>
            <Text style={styles.btnText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
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

  skillModal: {
    width: '100%',
    paddingBottom: moderateScale(20),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  closeIcon: {
    width: scale(20),
    height: scale(20),
  },
  modalHeader: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: TEXT_BLUE,
  },
  input: {
    width: '90%',
    height: scale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(20),
    paddingLeft: moderateScale(20),
  },
  btn: {
    width: '90%',
    height: scale(45),
    backgroundColor: TEXT_BLUE,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: BG_COLOR,
  },
  skillItem: {
    width: '90%',
    alignSelf: 'center',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: moderateScale(18),
    fontWeight: '500',
  },
  educYear: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
  },
  logoutBtn: {
    width: '90%',
    height: scale(45),
    backgroundColor: TEXT_BLUE,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: BG_COLOR,
  },
  headingView: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(30),
    alignSelf: 'center',
  },
});
