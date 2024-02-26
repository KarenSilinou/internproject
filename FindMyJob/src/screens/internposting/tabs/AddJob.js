import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomTextInput from '../../../common/CustomTextInput';
import CustomDropDown from '../../../common/CustomDropDown';

const AddJob = () => {
  const [jobTitle, setJobTiltle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAdress] = useState('');
  const [jobTime, setJobTime] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../../../images/close.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un stage</Text>
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
      <CustomTextInput
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt);
        }}
        title={'Description du stage'}
        //bad={badEmail != '' ? true : false}
        placeholder={"ex: C'est un stage en development web"}
        style={styles.textInput}
      />
      <CustomDropDown
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt);
        }}
        title={'Selectionner'}
        //bad={badEmail != '' ? true : false}
        placeholder={'Selectionner'}
        style={styles.textInput}
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
    </SafeAreaView>
  );
};

export default AddJob;
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
});
