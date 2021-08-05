import React, { useState } from 'react';
import { Singleton } from '../constants/Singleton';
import { Constants } from '../constants/Constants';
import { IAllDOEItem, CurrentScreen, Method, IUserPointItem, IResponseAllDOEScores, IResponseUserPoints } from '../types/custom-type';
import { begin, dumpError, dumpResponse, end } from '../utility/Utility';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'react-native';
import MyTaskHeader from '../components/MyTaskHeader';
import { moderateScale } from 'react-native-size-matters';
import { Color } from '../constants/Color';
import { Font } from '../constants/Font';
import Empty from '../components/Empty';
import AllDOEItem from '../components/AllDOEItem';
import UserPointsItem from '../components/UserPointItem';

const AllDOEScores = (props: any) => {

  const { navigation } = props;

  const [isDSEnable, setDSEnable] = useState<boolean>(true);
  const [isUPEnable, setUPEnable] = useState<boolean>(false);

  const [dsList, setDSList] = useState<IAllDOEItem[]>();
  const [upList, setUPList] = useState<IUserPointItem[]>();

  const [dsLoading, setDSLoading] = useState<boolean>(true);
  const [upLoading, setUPLoading] = useState<boolean>(true);

  const [singleton, setSingleton] = useState<Singleton>(
    Singleton.getInstance(),
  );

  useEffect(() => {
    fetchAllDOEScoresAPI();
    checkUserPointsUnderYouAPI();
  }, []);
 
  const fetchAllDOEScoresAPI = () => {
    setDSLoading(true);
    begin('fetchAllDOEScoresAPI');
    const requestBody = {};
    singleton
      .createRequest(requestBody, Constants.allDOEScoresAPI, Method.GET)
      .then(response => response.json())
      .then(async responseJson => {
        const responseObject:IResponseAllDOEScores = responseJson;
        if(responseObject.success == true){ 
          setDSList(responseObject.data.list);
        }
        setDSLoading(false);
      })
      .catch((error) => {
        dumpError(error);
        end('fetchAllDOEScoresAPI');
        setDSLoading(false);
      });
  };

  const checkUserPointsUnderYouAPI = () => {
    setDSLoading(true);
    begin('checkUserPointsUnderYouAPI');
    const requestBody = {};
    singleton
      .createRequest(requestBody, Constants.checkUserPointsUnderYouAPI, Method.GET)
      .then(response => response.json())
      .then(async responseJson => {
         const responseObject: IResponseUserPoints = responseJson;
         if(responseObject.success == true){ 
           setUPList(responseObject.data);
         } 
         setUPLoading(false);
      })
      .catch((error) => {
        dumpError(error);
        end('checkUserPointsUnderYouAPI');
        setUPLoading(false);
      });
  };

  const onDSPress = () => {
    setUPEnable(false);
    setDSEnable(true);
  }

  const onUPPress = () => {
    setDSEnable(false);
    setUPEnable(true);
  }

  const renderDSItem = ({item, index}:{item:IAllDOEItem, index:number}) => {
    return <AllDOEItem item={item} navigation={navigation} />;
  }

  const renderUPItem = ({item, index}:{item:IUserPointItem, index:number}) => {
    return <UserPointsItem item={item} navigation={navigation} />;
  }

  return (
    <View style={{ flex: moderateScale(1) }}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        translucent={false}
      />
      <MyTaskHeader props={props} currentScreen={CurrentScreen.ALL_DOE_SCORES} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={onDSPress} style={{ width: '40%', borderWidth: moderateScale(1), borderColor: Color.greenColor, borderRadius: moderateScale(15), backgroundColor: isDSEnable ? Color.greenColor : Color.whiteColor, alignItems: 'center', padding: moderateScale(10), margin: moderateScale(10) }}>
          <Text style={{ alignSelf: 'center', fontFamily: Font.fontBold, fontSize: moderateScale(12), color: isDSEnable ? Color.whiteColor : Color.greenColor }}>Directory Scores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onUPPress} style={{ width: '40%', borderWidth: moderateScale(1), borderColor: Color.greenColor, borderRadius: moderateScale(15), backgroundColor: isUPEnable ? Color.greenColor : Color.whiteColor, alignItems: 'center', padding: moderateScale(10), margin: moderateScale(10) }}>
          <Text style={{ alignSelf: 'center', fontFamily: Font.fontBold, fontSize: moderateScale(12), color: isUPEnable ? Color.whiteColor : Color.greenColor }}>User Points</Text>
        </TouchableOpacity>
      </View> 
      {
        isDSEnable == true ?
          dsList && dsList.length > 0 ? (
            <FlatList
              key={'' + dsList?.length}
              extraData={dsList?.length}
              horizontal={false}
              numColumns={1}
              data={dsList}
              renderItem={renderDSItem}
              keyExtractor={(data: IAllDOEItem, index:number) =>
                '' + data.name + index
              }   
            />
          ) : 
          dsList?.length == 0 ? <Empty /> : null : null
      }
      {
        isUPEnable == true ?
        upList && upList.length > 0 ? (
          <FlatList
            key={'' + upList?.length}
            extraData={upList?.length}
            horizontal={false}
            numColumns={1}
            data={upList}
            renderItem={renderUPItem}
            keyExtractor={(data: IUserPointItem, index:number) =>
              '' + data.id + index
            }   
          />
        ) : 
        upList?.length == 0 ? <Empty /> : null : null
      } 
      <ActivityIndicator
        animating={dsLoading == true || upLoading == true}
        color={Color.blackColor}
        size="large"
        style={{alignSelf: 'center', position: 'absolute', justifyContent: 'center', bottom: 300}}
      />
    </View>
  );
}

export default AllDOEScores;