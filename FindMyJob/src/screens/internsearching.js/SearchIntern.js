import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';

const SearchIntern = () => {
  const [search, setSearch] = useState('');
  const [interns, setInterns] = useState([]);
  const navigation = useNavigation();
  const [savedInterns, setSavedIntern] = useState([]);
  const isFocused = useIsFocused();

  const searchIntern = txt => {
    firestore()
      .collection('interns')
      .where('internTitle', '==', txt)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data()});
        });
        setInterns(temp);
      });
  };

  useEffect(() => {
    getSavedInterns();
  }, [isFocused]);

  const saveInterns = async data => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_interns')
      .add({
        ...data,
        userId: id,
      })
      .then(() => {
        console.log('intern saved successfully');
        getSavedInterns();
      });
  };

  const getSavedInterns = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_interns')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), savedId: item.id});
        });
        setInterns(temp); // Mettre à jour l'état avec toutes les offres enregistrées
      });
  };

  const removeSavedIntern = async id => {
    firestore()
      .collection('saved_interns')
      .doc(id)
      .delete()
      .then(() => {
        getSavedInterns(); // Mettre à jour la liste des offres enregistrées après la suppression
      });
  };

  const checkSavedIntern = id => {
    // let temp = savedInterns;

    // let isSaved = false;
    // temp.map(item => {
    //   console.log('saved item:'), item;
    //   if (item.id == id) {
    //     isSaved = true;
    //   }
    // });
    return savedInterns.some(item => item.id === id);
  };

  const getSavedInternsId = async idd => {
    const id = await AsyncStorage.getItem('USER_ID');
    let internId = '';
    const snapshot = await firestore()
      .collection('saved_interns')
      .where('userId', '==', id)
      .get();
    snapshot.docs.forEach(item => {
      if (idd == item.data().id) {
        internId = item.id;
      }
    });
    return internId;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require('../../images/search.png')}
          style={styles.icon}
        />
        <TextInput
          placeholderTextColor={'#9e9e9e'}
          placeholder="Rechercher un stage ici..."
          style={styles.input}
          value={search}
          onChangeText={txt => {
            setSearch(txt);
            searchIntern(txt);
          }}
        />
        {search != '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              searchIntern('');
            }}>
            <Image
              source={require('../../images/close.png')}
              style={styles.close}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={interns}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <TouchableOpacity
              style={styles.internItem}
              onPress={() => {
                navigation.navigate('InternDetails', {
                  data: item,
                });
              }}>
              <View style={styles.topView}>
                <Text style={styles.internTitle}>{item.internTitle}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (checkSavedIntern(item.id)) {
                      removeSavedIntern(item.savedId);
                    } else {
                      saveInterns(item);
                    }
                  }}>
                  <Image
                    source={
                      checkSavedIntern(item.id)
                        ? require('../../images/star1.png')
                        : require('../../images/star.png')
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.subTitle}>
                {'Categorie: ' + item.category}
              </Text>
              <Text style={styles.subTitle}>
                {'Poster par: ' + item.posterName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchIntern;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    width: '88%',
    height: verticalScale(40),
    borderWidth: 0.4,
    marginTop: moderateScale(20),
    alignSelf: 'center',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scale(18),
    height: scale(18),
    marginLeft: moderateScale(10),
  },
  input: {
    width: '70%',
    height: '100%',
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
  },
  close: {
    width: scale(16),
    height: scale(16),
    marginLeft: moderateScale(10),
  },
  internItem: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  internTitle: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    width: '90%',
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#2e2e2e',
    marginTop: moderateScale(5),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
