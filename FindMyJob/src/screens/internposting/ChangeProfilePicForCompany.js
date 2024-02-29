import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR} from '../../utils/Colors';
import {moderateScale, s, scale} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomSolidBtn from '../../common/CustomSolidBtn';
import CustomBorderBtn from '../../common/CustomBorderBtn';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../common/Loader';

const ChangeProfilePicForCompany = () => {
  const [imageData, setImageData] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const openGallery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };
  const openCamera = async () => {
    const res = await launchCamera({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };

  const uploadPic = async () => {
    setLoading(true);
    const id = AsyncStorage.getItem('USER_ID');
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    firestore()
      .collection('intern_posters')
      .doc(id)
      .update({
        profileImage: url,
      })
      .then(async () => {
        setLoading(false);
        await AsyncStorage.setItem('PROFILE_IMAGE', url);
        navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Image source={require('../../images/close.png')} style={styles.back} />
      </TouchableOpacity>
      {imageData == null ? (
        <Image
          source={require('../../images/profile.png')}
          style={styles.profile}
        />
      ) : (
        <Image source={{uri: imageData.assets[0].uri}} style={styles.profile} />
      )}

      <CustomBorderBtn
        title={'Choisir une image depuis la gallerie'}
        onClick={() => {
          openGallery();
        }}
      />
      {imageData != null && (
        <CustomSolidBtn
          title={'Modifier la photo de profil'}
          onClick={() => {
            uploadPic();
          }}
        />
      )}
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default ChangeProfilePicForCompany;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgrondColor: BG_COLOR,
  },
  back: {
    width: scale(18),
    height: scale(18),
  },
  backBtn: {
    marginLeft: moderateScale(20),
    marginTop: moderateScale(20),
  },
  profile: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    borderRadius: scale(150),
    marginTop: moderateScale(50),
  },
  pickBtn: {
    padding: moderateScale(10),
    borderWidth: 1,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(50),
  },
});
