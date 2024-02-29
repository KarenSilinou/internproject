import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, TEXT_BLUE} from '../../../utils/Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const MyInterns = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [interns, setInterns] = useState([
    useEffect(() => {
      getIntern();
    }, [isFocused]),
  ]);
  const getIntern = async () => {
    setLoading(true);
    let id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('interns')
      .where('postedBy', '==', id)
      .get()
      .then(async data => {
        setLoading(false);
        let temp = [];
        data.docs.forEach(item => {
          temp.push({...item.data(), id: item.id});
        });
        await AsyncStorage.setItem('INTERNS', temp.length + '');
        setInterns(temp);
      });
  };

  const deleteIntern = id => {
    firestore()
      .collection('interns')
      .doc(id)
      .delete()
      .then(() => {
        getIntern();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>INTERNGLOBE</Text>
      {loading && (
        <View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({item, index}) => {
              return (
                <View style={styles.loaderView}>
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <View style={styles.loaderBottomView}>
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {interns.length > 0 ? (
        <FlatList
          data={interns}
          renderItem={({item, index}) => {
            return (
              <View style={styles.internItem}>
                <Text style={styles.title}>{item.internTitle}</Text>
                <Text style={styles.desc}>{item.internDesc}</Text>
                <Text style={styles.duree}>
                  {'Categorie: ' + item.category + ''}
                </Text>
                <Text style={styles.duree}>
                  {'Duree: ' + item.internTime + ' Mois'}
                </Text>
                <Text style={styles.duree}>{'Competence: ' + item.skill}</Text>
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      navigation.navigate('EditIntern', {data: item});
                    }}>
                    <Text>Modifier l'offre</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      deleteIntern(item.id);
                    }}>
                    <Text style={{color: 'red'}}>Supprimer l'offre</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.title}>Aucune offre</Text>
        </View>
      )}
    </View>
  );
};

export default MyInterns;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    marginLeft: moderateScale(10),
    fontWeight: '600',
    color: TEXT_BLUE,
  },
  internItem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
  },
  desc: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginTop: moderateScale(5),
  },
  duree: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginTop: moderateScale(5),
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
  editBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    width: '90%',
    height: moderateScale(150),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  loaderTitle: {
    width: '70%',
    height: verticalScale(20),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },
  loaderBottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(10),
  },
  loaderBtn: {
    width: '46%',
    height: verticalScale(30),
    borderRadius: moderateScale(10),
  },
});
