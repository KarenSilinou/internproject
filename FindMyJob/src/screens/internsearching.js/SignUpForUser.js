import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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

const SignUpForUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [contact, setContact] = useState('');
  const [badContact, setBadContact] = useState('');
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let nameRegex = /^[A-Za-z]+$/;
    let validEmail = true;
    let validName = true;
    let validContact = true;
    let validPassword = true;

    if (name === '') {
      validName = false;
      setBadName('Veuillez entrer votre nom !!!');
    } else if (name.length < 3 || !name.match(nameRegex)) {
      validName = false;
      setBadName('Veuillez entrer un nom valide !!!');
    }

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === '' || !email.match(emailRegex)) {
      validEmail = false;
      setBadEmail('Veuillez entrer un email valide !!!');
    }

    let contactRegex = /^\d+$/;
    if (contact === '' || contact.length < 10 || !contact.match(contactRegex)) {
      validContact = false;
      setBadContact('Veuillez entrer un contact valide !!!');
    }

    if (password === '' || password.length < 6) {
      validPassword = false;
      setBadPassword(
        "Veuillez entrer un mot de passe d'au moins 6 caractères !!!",
      );
    }

    return validName && validEmail && validContact && validPassword;
  };

  const registerUser = () => {
    setLoading(true);
    firestore()
      .collection('users')
      .add({
        name: name,
        email: email,
        contact: contact,
        password: password,
      })
      .then(() => {
        setAccountCreated(true);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('LoginForUser');
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!accountCreated ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Créer un compte</Text>
          <CustomTextInput
            value={name}
            onChangeText={setName}
            title={'Nom'}
            placeholder={'ex: Kamga'}
            style={styles.textInput}
            bad={badName !== ''}
          />
          {badName !== '' && <Text style={styles.errorMsg}>{badName}</Text>}
          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            title={'Email'}
            placeholder={'ex: kamga@gmail.com'}
            style={styles.textInput}
            bad={badEmail !== ''}
          />
          {badEmail !== '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
          <CustomTextInput
            value={contact}
            onChangeText={setContact}
            title={'Contact'}
            placeholder={'ex: +237650505050'}
            style={styles.textInput}
            bad={badContact !== ''}
          />
          {badContact !== '' && (
            <Text style={styles.errorMsg}>{badContact}</Text>
          )}
          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            title={'Mot de passe'}
            placeholder={'ex: ********'}
            style={styles.textInput}
            bad={badPassword !== ''}
          />
          {badPassword !== '' && (
            <Text style={styles.errorMsg}>{badPassword}</Text>
          )}
          <CustomSolidBtn
            title={"S'inscrire"}
            onClick={() => {
              if (validate()) {
                registerUser();
              }
            }}
          />
          <CustomBorderBtn
            title={'Se connecter'}
            onClick={() => navigation.navigate('LoginForUser')}
          />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.doneView}>
          <Image
            source={require('../../images/checked.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Compte créé avec succès !</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpForUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(130),
    height: scale(130),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(25),
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(20),
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
  doneView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'transparent', // Added style for transparent background
    // Other styles from your CustomTextInput component
  },
});
