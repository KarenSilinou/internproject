import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomTextInput from '../../../common/CustomTextInput';
import CustomDropDown from '../../../common/CustomDropDown';
import CustomSolidBtn from '../../../common/CustomSolidBtn';
import {useNavigation, useRoute} from '@react-navigation/native';
import {profiles} from '../../../utils/Profiles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../common/Loader';

const EditJob = () => {
  const route = useRoute();
  const [jobTitle, setJobTiltle] = useState(route.params.data.jobTitle);
  const [jobDesc, setJobDesc] = useState(route.params.data.jobDesc);
  const [company, setCompany] = useState(route.params.data.company);
  const [companyAddress, setCompanyAdress] = useState(
    route.params.data.companyAddress,
  );
  const [jobTime, setJobTime] = useState(route.params.data.jobTime);
  const navigation = useNavigation();
  const [openCategoryModal, setCategoryModal] = useState(false);
  const [openSkillModal, setSkillModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Selected category');
  const [selectedSkill, setSelectedSkill] = useState('Selected skill');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    profiles.map((item, index) => {
      if (item.category == route.params.data.company) {
        setSelectedCategory(index);
        profiles[index].keywords.map((x, y) => {
          if (x[0] == route.params.data.skill) {
            setSelectedSkill(x[0]);
          }
        });
      }
    });
  }, []);
  const postJob = async () => {
    let id = await AsyncStorage.getItem('USER_ID');
    let name = await AsyncStorage.getItem('NAME');
    setLoading(true);
    firestore()
      .collection('jobs')
      .doc(route.params.data.id)
      .update({
        postedBy: id,
        posterName: name,
        jobTitle: jobTitle,
        jobDesc,
        company,
        jobTime,
        skill: selectedSkill,
        category: profiles[selectedCategory].category,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../../images/close.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Modifier un stage</Text>
      </View>
      <CustomTextInput
        value={jobTitle}
        onChangeText={txt => {
          setJobTiltle(txt);
        }}
        title={'Libelle du stage'}
        //bad={badEmail != '' ? true : false}
        placeholder={'ex: Developpement web'}
        style={styles.textInput}
      />
      <CustomDropDown
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt);
        }}
        title={'Categorie'}
        //bad={badEmail != '' ? true : false}
        placeholder={
          selectedCategory == 'Selected category'
            ? 'Selected category'
            : profiles[selectedCategory].category
        }
        onClick={() => {
          setCategoryModal(true);
        }}
      />
      <CustomDropDown
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt);
        }}
        title={'Competence'}
        //bad={badEmail != '' ? true : false}
        placeholder={selectedSkill}
        onClick={() => {
          setSkillModal(true);
        }}
      />
      <CustomTextInput
        value={company}
        onChangeText={txt => {
          setCompany(txt);
        }}
        title={'Entreprise'}
        //bad={badEmail != '' ? true : false}
        placeholder={'ex Google'}
        style={styles.textInput}
      />
      <CustomTextInput
        value={companyAddress}
        onChangeText={txt => {
          setCompanyAdress(txt);
        }}
        title={"Adresse de l'entreprise"}
        //bad={badEmail != '' ? true : false}
        placeholder={'ex Akwa'}
        style={styles.textInput}
      />
      <CustomTextInput
        value={jobTime}
        onChangeText={txt => {
          setJobTime(txt);
        }}
        keyboardType={'number-pad'}
        title={'Duree du stage'}
        //bad={badEmail != '' ? true : false}
        placeholder={'ex 2mois'}
        style={styles.textInput}
      />
      <CustomTextInput
        value={jobDesc}
        multiline
        numberOfLines={4}
        onChangeText={txt => {
          setJobDesc(txt);
        }}
        title={'Description du stage'}
        //bad={badEmail != '' ? true : false}
        placeholder={"ex: C'est un stage en development web"}
        style={styles.textInput}
      />
      <CustomSolidBtn
        title={"Modifier l'offre"}
        onClick={() => {
          postJob();
        }}
      />
      <Modal visible={openCategoryModal} transparent style={{flex: 1}}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, {marginTop: moderateScale(20)}]}>
              Selectionner une categorie
            </Text>
            <FlatList
              data={profiles}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedCategory(index);
                      setCategoryModal(false);
                    }}>
                    <Text>{item.category}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={openSkillModal} transparent style={{flex: 1}}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, {marginTop: moderateScale(20)}]}>
              Selectionner la competence
            </Text>
            <FlatList
              data={
                selectedCategory == 'Selected category'
                  ? profiles[0].keywords
                  : profiles[selectedCategory].keywords
              }
              renderItem={({item, index}) => {
                console.log(item);
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedSkill(item[0]);
                      setSkillModal(false);
                    }}>
                    <Text>{item[0]}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default EditJob;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    width: '100%',
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
  },
  back: {
    width: scale(16),
    height: scale(16),
  },
  title: {
    fontSize: moderateScale(20),
    marginLeft: moderateScale(20),
    fontWeight: '600',
  },
  modalMainView: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingView: {
    width: '90%',
    height: '80%',
    borderRadius: moderateScale(10),
    backgroundColor: BG_COLOR,
  },
  profileItem: {
    width: '90%',
    height: verticalScale(40),
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    alignSelf: 'center',
    borderBottomWidth: 0.4,
  },
});
