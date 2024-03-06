import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomDropDown from '../../../common/CustomDropDown';
import CustomSolidBtn from '../../../common/CustomSolidBtn';
import CustomTextInput from '../../../common/CustomTextInput';
import Loader from '../../../common/Loader';
import {BG_COLOR} from '../../../utils/Colors';
import {profiles} from '../../../utils/Profiles';

const AddIntern = () => {
  const [internTitle, setInternTitle] = useState('');
  const [badInternTitle, setBadInternTitle] = useState('');
  const [internDesc, setInternDesc] = useState('');
  const [badInternDesc, setBadInternDesc] = useState('');
  const [company, setCompany] = useState('');
  const [badCompany, setBadCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [badCompanyAddress, setBadCompanyAddress] = useState('');
  const [internTime, setInternTime] = useState('');
  const [badInternTime, setBadInternTime] = useState('');
  const navigation = useNavigation();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Selected category');
  const [badInternCategory, setBadInternCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('Selected skill');
  const [badInternSkill, setBadInternSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const postIntern = async () => {
    let id = await AsyncStorage.getItem('USER_ID');
    let name = await AsyncStorage.getItem('NAME');
    setLoading(true);
    firestore()
      .collection('interns')
      .add({
        postedBy: id,
        posterName: name,
        internTitle: internTitle,
        internDesc: internDesc,
        company: company,
        internTime: internTime,
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

  const validate = () => {
    let validInternTitle = true;
    let validInternDesc = true;
    let validCategory = true;
    let validSkill = true;
    let validCompany = true;
    let validInternTime = true;
    let validCompanyAddress = true;

    if (internTitle === '') {
      validInternTitle = false;
      setBadInternTitle("Svp entrez le titre de l'offre");
    } else {
      setBadInternTitle('');
    }

    if (internDesc === '' || internDesc.length < 10) {
      validInternDesc = false;
      setBadInternDesc("Svp entrez une description d'au moins 10 caractères");
    } else {
      setBadInternDesc('');
    }

    if (selectedCategory === 'Selected category') {
      validCategory = false;
      setBadInternCategory("Svp entrez la categorie de l'offre");
    } else {
      setBadInternCategory('');
    }

    if (selectedSkill === 'Selected skill') {
      validSkill = false;
      setBadInternSkill('Svp entrez la compétence');
    } else {
      setBadInternSkill('');
    }

    if (company === '') {
      validCompany = false;
      setBadCompany('Svp entrez la compagnie');
    } else {
      setBadCompany('');
    }

    if (internTime === '') {
      validInternTime = false;
      setBadInternTime("Svp entrez la période de l'offre");
    } else {
      setBadInternTime('');
    }

    if (companyAddress === '') {
      validCompanyAddress = false;
      setBadCompanyAddress("Svp entrez l'adresse de l'entreprise");
    } else {
      setBadCompanyAddress('');
    }

    return (
      validInternTitle &&
      validInternDesc &&
      validCategory &&
      validSkill &&
      validCompany &&
      validCompanyAddress &&
      validInternTime
    );
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
        <Text style={styles.title}>Ajouter une offre</Text>
      </View>
      <CustomTextInput
        value={internTitle}
        onChangeText={txt => {
          setInternTitle(txt);
        }}
        title={'Libelle du stage'}
        bad={badInternTitle != '' ? true : false}
        placeholder={'ex: Developpement web'}
        style={styles.textInput}
      />
      {badInternTitle != '' && (
        <Text style={styles.errorMsg}>{badInternTitle}</Text>
      )}
      <CustomDropDown
        value={internDesc}
        onChangeText={txt => {
          setInternDesc(txt);
        }}
        title={'Categorie'}
        bad={badInternCategory != '' ? true : false}
        placeholder={
          selectedCategory == 'Selected category'
            ? 'Selected category'
            : profiles[selectedCategory].category
        }
        onClick={() => {
          setOpenCategoryModal(true);
        }}
      />
      {badInternCategory != '' && (
        <Text style={styles.errorMsg}>{badInternCategory}</Text>
      )}
      <CustomDropDown
        value={internDesc}
        onChangeText={txt => {
          setInternDesc(txt);
        }}
        title={'Competence'}
        bad={badInternSkill != '' ? true : false}
        placeholder={selectedSkill}
        onClick={() => {
          setOpenSkillModal(true);
        }}
      />
      {badInternSkill != '' && (
        <Text style={styles.errorMsg}>{badInternSkill}</Text>
      )}
      <CustomTextInput
        value={company}
        onChangeText={txt => {
          setCompany(txt);
        }}
        title={'Entreprise'}
        bad={badcompany != '' ? true : false}
        placeholder={'ex Google'}
        style={styles.textInput}
      />
      {badcompany != '' && <Text style={styles.errorMsg}>{badcompany}</Text>}
      <CustomTextInput
        value={companyAddress}
        onChangeText={txt => {
          setCompanyAdress(txt);
        }}
        title={"Adresse de l'entreprise"}
        bad={badCompanyAddress != '' ? true : false}
        placeholder={'ex Akwa'}
        style={styles.textInput}
      />
      {badCompanyAddress != '' && (
        <Text style={styles.errorMsg}>{badCompanyAddress}</Text>
      )}
      <CustomTextInput
        value={internTime}
        onChangeText={txt => {
          setInternTime(txt);
        }}
        keyboardType={'number-pad'}
        title={'Duree du stage'}
        bad={badInternTime != '' ? true : false}
        placeholder={'ex 2mois'}
        style={styles.textInput}
      />
      {badInternTime != '' && (
        <Text style={styles.errorMsg}>{badInternTime}</Text>
      )}
      <CustomTextInput
        value={internDesc}
        multiline
        numberOfLines={4}
        onChangeText={txt => {
          setInternDesc(txt);
        }}
        title={'Description du stage'}
        bad={badInternDesc != '' ? true : false}
        placeholder={"ex: C'est un stage en development web"}
        style={styles.textInput}
      />
      {badInternDesc != '' && (
        <Text style={styles.errorMsg}>{badInternDesc}</Text>
      )}
      <CustomSolidBtn
        title={"Poster l'offre"}
        onClick={() => {
          if (validate()) {
            postIntern();
          }
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

export default AddIntern;
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
  textInput: {},
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
  errorMsg: {
    color: 'red',
    marginLeft: moderateScale(25),
  },
});
