import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements/dist/card/Card';
import {moderateScale} from 'react-native-size-matters';
import {Color} from '../constants/Color';
import { Font } from '../constants/Font';
import { IAllDOEItem, ITaskItem } from '../types/custom-type';

const DOETaskItem = (props:any) => {
  const item:ITaskItem = props.item;
  return (
    <Card containerStyle={{ backgroundColor: Color.applicationColor, padding: moderateScale(10), margin: moderateScale(5), borderWidth: moderateScale(0.1), borderRadius: moderateScale(10) }} >
      <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.name}>{item.taskname}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: moderateScale(10)}}>
        <View style={{width: '50%'}}> 
          <View>
            <Text style={styles.taskId}>
                Task ID
            </Text>
            <Text style={styles.taskIdValue}>
                {item.taskid}
            </Text>
          </View>
          <View>
            <Text style={styles.taskType}>
                User
            </Text>
            <Text style={styles.taskTypeValue}>
                {item.username}
            </Text>
          </View>
        </View>
        <View style={{width: '50%', alignItems: 'center'}}>  
          <Text style={{fontFamily: Font.fontBold, fontSize: moderateScale(35), color: Color.greenColor}}>
            4
          </Text>   
          <Text style={{fontFamily: Font.fontBold, color: Color.whiteColor, fontSize: moderateScale(10)}}>
              {item.date}
          </Text>      
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({ 
  name : {
    fontFamily: Font.fontMedium,
    fontSize: moderateScale(13),
    color: Color.whiteColor
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
  },
  taskId: {
      fontFamily: Font.fontMedium,
      fontSize: moderateScale(10),
      color: Color.redColor
  },
  taskIdValue: {
      fontFamily: Font.fontBold,
      fontSize: moderateScale(13),
      color: Color.whiteColor
  },
  taskType: {
      fontFamily: Font.fontMedium,
      fontSize: moderateScale(10),
      color: Color.redColor
  },
  taskTypeValue: {
      fontFamily: Font.fontBold,
      fontSize: moderateScale(13),
      color: Color.whiteColor
  },
});

export default DOETaskItem;
