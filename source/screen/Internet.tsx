import React from 'react';
import {StyleSheet, SafeAreaView, Image, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Internet = (props: any) => {
  return (
    <SafeAreaView style={styles.internetContainer}>
      <Image
        source={require('../assets/no_internet.png')}
        style={styles.internetImageContent}
      />
      <Text style={styles.internetMessage}>No Internet Connection</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  internetContainer: {
    flex: moderateScale(1),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  internetImageContent: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
  },
  internetMessage: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(17),
    alignSelf: 'center',
    padding: moderateScale(10),
    color: '#000000',
  },
});

export default Internet;
