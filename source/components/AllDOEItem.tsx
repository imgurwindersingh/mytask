import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements/dist/card/Card';
import {moderateScale} from 'react-native-size-matters';
import {Color} from '../constants/Color';
import { Font } from '../constants/Font';
import { IAllDOEItem } from '../types/custom-type';

const AllDOEItem = (props:any) => {
  const item:IAllDOEItem = props.item;
  const navigation = props.navigation;
  return (
    <Card containerStyle={{ padding: moderateScale(10), margin: moderateScale(5), borderWidth: moderateScale(0.1) }} >
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.name}>{item.name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: moderateScale(10)}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.noOfTasks}>No. Of Tasks</Text>
          <Text style={styles.value}>{item.nooftaks}</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.totalPoints}>Total Points</Text>
          <Text style={styles.value}>{item.totalpoints}</Text>          
        </View>
        <TouchableOpacity  
          onPress={() => navigation.navigate('doe-task-view')}
          style={{borderRadius: moderateScale(20), 
                  backgroundColor: Color.darkRedColor, 
                  justifyContent: 'center', 
                  paddingHorizontal: moderateScale(10)}}>
          <Text style={{fontFamily: Font.fontMedium, 
                        fontSize: moderateScale(10), 
                        color: Color.whiteColor}}>View Tasks</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({ 
  name : {
    fontFamily: Font.fontBold,
    fontSize: moderateScale(12),
    color: Color.redColor
  },
  noOfTasks : {
    fontFamily: Font.fontBold, 
    fontSize: moderateScale(10)
  },
  totalPoints : {
    fontFamily: Font.fontBold, 
    fontSize: moderateScale(10)
  },
  value : {
    fontFamily: Font.fontBold, 
    fontSize: moderateScale(13), 
    color: Color.darkRedColor, 
    alignSelf: 'center'
  }
});

export default AllDOEItem;
