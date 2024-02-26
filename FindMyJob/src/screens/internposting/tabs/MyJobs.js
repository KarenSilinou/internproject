import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, TEXT_BLUE} from '../../../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyJobs = () => {
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([
    useEffect(() => {
      getJob();
    }, [isFocused]),
  ]);
  const getJob = async () => {
    let id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('jobs')
      .where('postedBy', '==', id)
      .get()
      .then(data => {
        let temp = [];
        data.docs.forEach(item => {
          temp.push({...item.data(), id: item.id});
        });
        setJobs(temp);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>INTERNGLOBE</Text>
      <FlatList
        data={jobs}
        renderItem={({item, index}) => {
          return (
            <View style={styles.jobItem}>
              <Text style={styles.title}>{item.jobTitle}</Text>
              <Text style={styles.desc}>{item.jobDesc}</Text>
              <Text style={styles.title}>{item.Category}</Text>
              <Text style={styles.title}>{item.jobTime + ' Mois'}</Text>
              <Text style={styles.title}>{item.skill}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyJobs;
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
  jobItem: {
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
});
