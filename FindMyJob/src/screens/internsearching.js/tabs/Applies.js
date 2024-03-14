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
import {moderateScale, scale} from 'react-native-size-matters';
import NoLoginComponent from '../../../common/NoLoginComponent';
import {BG_COLOR, TEXT_COLOR} from '../../../utils/Colors';

const Applies = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [interns, setInterns] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getInterns();
  }, [isFocused]);
  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };

  const getInterns = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('applied_interns')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        console.log('interns', snapshot.docs);
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), appliedId: item.id});
        });
        setInterns(temp);
      });
  };

  const removeSavedIntern = id => {
    firestore()
      .collection('applied_interns')
      .doc(id)
      .delete()
      .then(() => {
        getInterns();
      });
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComponent
          desc={
            'Pour avoir la trace de vos demandes de stage vous devez creer un compte'
          }
          heading={'Une place pour traquer toutes vos demandes'}
        />
      )}
      {isLogin && interns.length > 0 ? (
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
                      removeSavedIntern(item.appliedId);
                    }}>
                    <Image
                      source={require('../../../images/star1.png')}
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
      ) : null}
      {isLogin && interns.length < 1 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Aucun stage postuler</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Applies;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
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
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 30,
    fontWeight: '500',
  },
});
