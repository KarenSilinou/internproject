import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomBorderBtn from '../../common/CustomBorderBtn'; // Assume this component already exists
import CustomSolidBtn from '../../common/CustomSolidBtn'; // Assume this component already exists
import CustomTextInput from '../../common/CustomTextInput'; // Assume this component already exists
import Loader from '../../common/Loader';
import {BG_COLOR} from '../../utils/Colors';

const LoginForCompany = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const validate = () => {
    let validEmail = true;
    let validPassword = true;

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
      validEmail = false;
      setBadEmail('Svp entrez votre email !!!');
    } else if (email != '' && !email.toString().match(emailRegex)) {
      validEmail = false;
      setBadEmail('Svp entrez un email valide !!!');
    } else if (email != '' && email.toString().match(emailRegex)) {
      validEmail = true;
      setBadEmail('');
    }

    if (password == '') {
      validPassword = false;
      setBadPassword('Svp entrez le mot de passe !!!');
    } else if (password != '' && password.length < 6) {
      validPassword = false;
      setBadPassword('Svp minimum 6 caracteres !!!');
    } else if (password != '' && password.length > 6) {
      validPassword = true;
      setBadPassword('');
    }

    return validEmail && validPassword;
  };

  const loginUser = () => {
    setLoading(true);
    firestore()
      .collection('intern_posters')
      .where('email', '==', email)
      .get()
      .then(data => {
        setLoading(false);
        console.log(data.docs);
        if (data.docs.length > 0) {
          data.docs.forEach(item => {
            if (item.data().password == password) {
              setBadEmail('');
              setBadPassword('');
              goToNextScreen(item.id, item.data().email, item.data().name);
            } else {
              setBadPassword('Mot de passe incorrecte !!!');
            }
          });
        } else {
          setBadEmail('Aucun utilisateur avec cet email');
          //setBadPassword('Mot de passe incorrect !!!');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const goToNextScreen = async (id, email, name) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USER_ID', id);
    await AsyncStorage.setItem('USER_TYPE', 'company');
    navigation.navigate('DashboardForCompany');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>
      <CustomTextInput
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
        title={'Email'}
        bad={badEmail != '' ? true : false}
        placeholder={'ex: kamga@gmail.com'}
        style={styles.textInput}
      />
      {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
      <CustomTextInput
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
        title={'Mot de passe'}
        placeholder={'ex: ********'}
        style={styles.textInput}
        bad={badPassword != '' ? true : false}
      />
      {badPassword != '' && <Text style={styles.errorMsg}>{badPassword}</Text>}
      <Text style={styles.forgotPassword}>Mot de passe oublier ?</Text>
      <CustomSolidBtn
        title={'Connexion'}
        onClick={() => {
          if (validate()) {
            loginUser();
          }
        }}
      />
      <CustomBorderBtn
        onClick={() => navigation.navigate('SignUpForCompany')}
        title={'Creer un compte'}
      />
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default LoginForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(40),
    backgroundColor: 'transparent',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
    marginTop: moderateVerticalScale(10),
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
  errorMsg: {
    marginLeft: moderateScale(25),
    color: 'red',
  },
  textInput: {
    backgroundColor: 'transparent', // Added style for transparent background
    // Other styles from your CustomTextInput component
  },
});
