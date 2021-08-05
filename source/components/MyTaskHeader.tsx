import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {Color} from '../constants/Color';
import {Font} from '../constants/Font';
import {theme} from '../core/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useState } from 'react';
import { Singleton } from '../constants/Singleton';

export default function MyTaskHeader(props: any) {
  const {navigation} = props?.props;
  const[singleton, setSingleton] = useState<Singleton>(Singleton.getInstance());
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Color.blackColor,
        padding: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'space-between'
      }}> 
      <Entypo 
        onPress={() => { 
          navigation.toggleDrawer()
        }}
        name="menu"
        size={25}
        color={Color.whiteColor}
        style={{alignSelf: 'center', padding: moderateScale(5)}}
      /> 
      <Text
        style={{
          width: '75%',
          alignSelf: 'center',
          textAlign: 'left',
          color: Color.whiteColor,
          fontFamily: Font.fontMedium,
          fontSize: moderateScale(15)
        }}>
        {props?.currentScreen}
      </Text>
      <AntDesign
        onPress={() => { 
          singleton.logout(navigation);
        }}
        name="logout"
        size={20}
        color={Color.whiteColor}
        style={{alignSelf: 'center', padding: moderateScale(5)}}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center',
  },
});
