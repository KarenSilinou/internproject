import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_BLUE1} from '../../utils/Colors';

const InternDetails = () => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.data.internTitle}</Text>
      <View style={styles.detailsView}>
        <Text>{'Poster par: ' + route.params.data.posterName}</Text>
      </View>
      <Text style={styles.desc}>{route.params.data.internDesc}</Text>
      <Text style={styles.subTitle}>
        {'Competence requise: ' + route.params.data.skill}
      </Text>
      <Text style={styles.subTitle}>
        {'Entreprise: ' + route.params.data.company}
      </Text>
      <Text style={styles.subTitle}>
        {'Duree: ' + route.params.data.internTime + ' Mois'}
      </Text>
      <Text style={styles.subTitle}>
        {'Categorie: ' + route.params.data.category}
      </Text>
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.saveBtn}>
          <Image
            source={require('../../images/star.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.btnText}>Postuler pour le stage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InternDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '700',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  desc: {
    width: '90%',
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: '500',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: moderateScale(20),
    fontWeight: '500',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(20),
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  bottomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: moderateScale(30),
  },
  saveBtn: {
    width: '25%',
    height: verticalScale(35),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  applyBtn: {
    width: '70%',
    height: scale(40),
    backgroundColor: TEXT_BLUE1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
  },
});
