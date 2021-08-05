import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Color} from '../constants/Color';

const Empty = () => {
  return (
    <View style={styles.emptyContentView}>
      <Image
        source={require('../assets/empty.png')}
        style={styles.emptyImageContent}
      />
      <Text style={styles.emptyTextContent}>It's Empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContentView: {
    flex: moderateScale(1),
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
  },
  emptyImageContent: {
    width: '50%',
    height: '30%',
    aspectRatio: moderateScale(1),
    alignSelf: 'center',
  },
  emptyTextContent: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(17),
    alignSelf: 'center',
    padding: moderateScale(10),
  },
});

export default Empty;
