import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomSolidBtn from '../../../common/CustomSolidBtn';
import {BG_COLOR, TEXT_BLUE, TEXT_BLUE1} from '../../../utils/Colors';

const Home = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.searchBox}>
        <Image
          source={require('../../../images/search.png')}
          style={styles.icon}
        />
        <Text style={styles.placeholder}>Rechercher votre stage ici...</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>
        {"Vous n'êtes plus qu'à un pas de décrocher un bon stage"}
      </Text>
      <View style={styles.notes}>
        <Image
          source={require('../../../images/star.png')}
          style={styles.icon}
        />
        <Text style={styles.note}>
          {"Postuler à des stages après la création d'un compte"}
        </Text>
      </View>
      <View style={styles.notes}>
        <Image
          source={require('../../../images/star.png')}
          style={styles.icon}
        />
        <Text style={styles.note}>{'Disctuter avec des entreprises'}</Text>
      </View>
      <View style={styles.btnsView}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={[styles.btnText, {color: BG_COLOR}]}>Se Connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn}>
          <Text style={styles.btnText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.internSearchCard}>
        <Image
          source={require('../../../images/searchanim.gif')}
          style={styles.gif}
        />
        <TextInput
          style={[styles.input, {marginTop: moderateScale(15)}]}
          placeholder="Entrer le titre du stage"
        />
        <TextInput
          style={[styles.input, {marginTop: moderateScale(15)}]}
          placeholder="Entrer le titre du stage"
        />
        <CustomSolidBtn title={'Rechercher un stage'} onClick={() => {}} />
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(25),
    borderColor: '9e9e9e',
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
  },
  icon: {
    width: scale(16),
    height: scale(16),
    tintColor: 'gray',
  },
  placeholder: {
    marginLeft: moderateScale(10),
    color: 'gray',
  },
  heading: {
    color: TEXT_BLUE,
    fontWeight: '700',
    fontSize: moderateScale(22),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(20),
  },
  notes: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  note: {
    marginLeft: moderateScale(10),
  },
  btnsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  loginBtn: {
    width: '40%',
    height: verticalScale(30),
    backgroundColor: TEXT_BLUE1,
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    width: '40%',
    height: verticalScale(30),
    borderColor: TEXT_BLUE1,
    borderWidth: 1,
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  internSearchCard: {
    width: '90%',
    paddingBottom: moderateScale(20),
    alignSelf: 'center',
    marginTop: moderateScale(50),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(10),
  },
  gif: {
    alignSelf: 'center',
    width: scale(311),
    height: scale(55),
  },
  input: {
    width: '90%',
    height: verticalScale(35),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
});
