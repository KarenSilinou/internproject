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

const SignUpForCompany = () => {
  const navigation = useNavigation();

  // State variables for user input and potential validation errors
  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [accountCreated, setAccountCreated] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [badCompanyName, setBadCompanyName] = useState('');

  const [contact, setContact] = useState('');
  const [badContact, setBadContact] = useState('');

  const [address, setAddress] = useState('');
  const [badAddress, setBadAddress] = useState('');

  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let nameRegex = /^[A-Za-z]+$/;
    let validEmail = true;
    let validName = true;
    let validContact = true;
    let validCompany = true;
    let validAddress = true;
    let validPassword = true;
    if (name == '') {
      validName = false;
      setBadName('Svp entrez votre nom !!!');
    } else if (name != '' && name.length < 3) {
      validName = false;
      setBadName('Svp entrez un nom valide !!!');
    } else if (name != '' && name.length > 3) {
      validName = true;
      setBadName('');
    }

    if (name == '') {
      validName = false;
      setBadName('Svp entrez votre nom !!!');
    } else if (name != '' && name.length < 3) {
      validName = false;
      setBadName('Svp entrez un nom valide !!!');
    } else if (
      name != '' &&
      name.length >= 3 &&
      !name.toString().match(nameRegex)
    ) {
      validName = false;
      setBadName('Svp entrez un nom valide !!!');
    } else if (
      name != '' &&
      name.length > 3 &&
      name.toString().match(nameRegex)
    ) {
      validName = true;
      setBadName('');
    }

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

    let contactRegex = /^\d+$/;
    if (contact == '') {
      validContact = false;
      setBadContact('Svp entrez un contact !!!');
    } else if (contact != '' && contact.length < 9) {
      validContact = false;
      setBadContact('Svp entrer un contact valide !!!');
    } else if (
      contact != '' &&
      contact.length >= 10 &&
      !contact.match(contactRegex)
    ) {
      validContact = false;
      setBadContact('Svp entrez un contact valide !!!');
    } else if (
      contact != '' &&
      contact.length >= 10 &&
      contact.match(contactRegex)
    ) {
      validContact = true;
      setBadContact('');
    }

    if (companyName == '') {
      validCompany = false;
      setBadCompanyName('Svp entrez le nom de la compagnie !!!');
    } else if (companyName != '') {
      validCompany = true;
      setBadCompanyName('');
    }

    if (address == '') {
      validAddress = false;
      setBadAddress("Svp entrez l'adresse !!!");
    } else if (address != '') {
      validAddress = true;
      setBadAddress('');
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

    return (
      validName &&
      validEmail &&
      validContact &&
      validCompany &&
      validAddress &&
      validPassword
    );
  };

  const registerUser = () => {
    setLoading(true);
    firestore()
      .collection('intern_posters')
      .add({
        name,
        email,
        contact,
        companyName,
        address,
        password,
      })
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setCompanyName('');
        setContact('');
        setAccountCreated(true);
        setLoading(false);
        setTimeout(() => {
          navigation.goBack();
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
        <ScrollView>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Creer un compte</Text>
          <CustomTextInput
            value={name}
            onChangeText={txt => {
              setName(txt);
            }}
            title={'Nom'}
            placeholder={'ex: Kamga'}
            style={styles.textInput}
            bad={badName != '' ? true : false}
          />
          {badName != '' && <Text style={styles.errorMsg}>{badName}</Text>}
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
            value={contact}
            onChangeText={txt => {
              setContact(txt);
            }}
            title={'Contact'}
            placeholder={'ex: +237650505050'}
            style={styles.textInput}
            bad={badContact != '' ? true : false}
          />
          {badContact != '' && (
            <Text style={styles.errorMsg}>{badContact}</Text>
          )}
          <CustomTextInput
            value={companyName}
            onChangeText={txt => {
              setCompanyName(txt);
            }}
            title={'Nom de la compagnie'}
            placeholder={'ex: SONARA SARL'}
            style={styles.textInput}
            bad={badCompanyName != '' ? true : false}
          />
          {badCompanyName != '' && (
            <Text style={styles.errorMsg}>{badCompanyName}</Text>
          )}
          <CustomTextInput
            value={address}
            onChangeText={txt => {
              setAddress(txt);
            }}
            title={'Adresse'}
            placeholder={'ex: Bonamoussadi'}
            style={styles.textInput}
            bad={badAddress != '' ? true : false}
          />
          {badAddress != '' && (
            <Text style={styles.errorMsg}>{badAddress}</Text>
          )}
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
          {badPassword != '' && (
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
            onClick={() => navigation.goBack()}
          />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.doneView}>
          <Image
            source={require('../../images/checked.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>{'Compte creer avec succes !'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpForCompany;

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
