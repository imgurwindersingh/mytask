import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {Constants} from '../constants/Constants';
import {Singleton} from '../constants/Singleton'; 
import {begin, dumpError, dumpLog, dumpResponse, end} from '../utility/Utility';
import Internet from './Internet';
import NetInfo from '@react-native-community/netinfo';
import Empty from '../components/Empty';
import { CurrentScreen, IDashboardResponse, ITask, Method } from '../types/custom-type';
import MyTaskHeader from '../components/MyTaskHeader';
import { Color } from '../constants/Color';
import { Font } from '../constants/Font';
import { Button } from 'react-native-paper';

const Dashboard = (props: any) => {
  const {navigation, route} = props;

  const insets = useSafeAreaInsets();
  const INITIAL_LIMIT = 15;
  const INITIAL_OFFSET = 0;

  const [refreshing, setRefreshing] = useState(false);
  const [endReached, setEndReached] = useState(false);
 
  const [isConnected, setConnected] = useState<boolean | null>(true);
  const [taskList, setTaskList] = useState<ITask[]>();

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [singleton, setSingleton] = useState<Singleton>(
    Singleton.getInstance(),
  );

  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: isConnected,
    });
  }, [navigation, isConnected]);

  useEffect(() => {
    fetchDashboard();

    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    // fetchProductCategory();
  }, [refreshing]);
  
  const fetchDashboard = () => {
    const requestBody = {};

    singleton
      .createRequest(requestBody, Constants.dashboardAPI, Method.GET)
      .then(response => response.json())
      .then(async responseJson => {
        dumpResponse(responseJson);
        let tempArray = [];
        //handle response and print and check
        const responseObject: IDashboardResponse = responseJson;
        if (responseObject.success == true) {
          for (var key in responseObject.data) {
            if (responseObject.data.hasOwnProperty(key)) {
                const data: ITask = {
                  title: key,
                  count: responseObject.data[key]
                }
                tempArray.push(data);
            }
          }
          setTaskList(tempArray);
        } else {
          singleton.showShortSnackbar(responseJson.errorMsg);
        }
        setRefreshing(false);
        setEndReached(false);
      })
      .catch((error) => {
        dumpError(error);
        end('Dashboard');
        setRefreshing(false);
        setEndReached(false);
      });
  };


  const renderItem = ({
    item,
    index,
  }: {
    item: ITask;
    index: number;
  }) => {
    return <TouchableOpacity style={{ flexDirection: 'row', 
                          backgroundColor: Color.dullColor, 
                          width: '94%',
                          height: 100, 
                          padding: 10, 
                          marginHorizontal: 10, 
                          marginBottom: 10, 
                          borderRadius:3,
                          alignSelf: 'center',
                          justifyContent: 'space-between'}}
                          onPress={() => navigation.navigate('all-tasks')}
                          >
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <View style={{alignSelf: 'center', backgroundColor: Color.redColor, width: 44, height:44, borderRadius: 22}}>
                <Text style={{alignSelf: 'center', fontSize: 20, paddingTop: 5, color: Color.whiteColor, textTransform: 'uppercase'}}>{item.title.charAt(0)}</Text>
              </View>
              <View style={{alignSelf: 'center', paddingHorizontal: 15}}>
                <Text style={{fontFamily: Font.fontBold, fontSize: moderateScale(15)}}>{item.count}</Text>
                <Text style={{fontFamily: Font.fontMedium, fontSize: moderateScale(13)}}>{item.title}</Text>
              </View>  
            </View>
          </TouchableOpacity>;
  };

  return isConnected == false ? (
    <Internet />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        translucent={false}
      />
      <MyTaskHeader props={props} currentScreen={CurrentScreen.DASHBOARD} />
      {
        taskList == undefined ?
          <ActivityIndicator
            animating={true}
            color={Color.applicationColor}
            size="large"
            style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}
          /> : null
      }
      {taskList && taskList.length > 0 ? (
        <FlatList
          key={'' + taskList?.length}
          extraData={taskList?.length}
          horizontal={false}
          numColumns={1}
          ListHeaderComponent={() => <View style={{backgroundColor: Color.applicationColor, width: '94%', height: 130, marginTop: 10, marginHorizontal: 10, marginBottom: 10, borderRadius:3}}>
          <View style={{backgroundColor: Color.whiteColor, width: 44, height:44, borderRadius: 22, margin: 10}}>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={{fontFamily: Font.fontBold, fontSize: moderateScale(20), color: Color.whiteColor}}>{'1508'}</Text>
            <Text style={{fontFamily: Font.fontMedium, fontSize: moderateScale(15), color: Color.whiteColor}}>{'Tasks'}</Text>
          </View>  
        </View>}
          data={taskList}
          renderItem={renderItem}
          keyExtractor={(task: ITask) =>
            '' + task.title
          }
          onEndReached={({distanceFromEnd}) => {
            setEndReached(true);
            fetchDashboard();
          }}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => (
            <View>
              <ActivityIndicator
                animating={endReached}
                color={Color.applicationColor}
                size="large"
              />
            </View>
          )}
        />
      ) : null}
      {taskList?.length == 0 ? <Empty /> : null}  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: moderateScale(1),
    backgroundColor: Color.whiteColor,
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(14),
    alignSelf: 'flex-start',
    color: '#000000',
  },
  desc: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(12),
    color: '#000000',
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Dashboard;
