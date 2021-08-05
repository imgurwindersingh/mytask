import React, { useEffect, useState } from 'react'; 
import { Constants } from '../constants/Constants';
import { begin, dumpError, dumpLog, end } from '../utility/Utility';
import { CurrentScreen, ITask, ITaskItem, Method } from '../types/custom-type';
import { Singleton } from '../constants/Singleton';
import { StatusBar, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import MyTaskHeader from '../components/MyTaskHeader';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { Color } from '../constants/Color';
import Empty from '../components/Empty';
import TaskItem from '../components/TaskItem';

const MyTask = (props:any) => {
  const {navigation, route} = props;

  const [taskList, setTaskList] = useState<ITask[]>();

  const [loading, setLoading] = useState<boolean>(true);

  const [singleton, setSingleton] = useState<Singleton>(
    Singleton.getInstance(),
  );

  useEffect(() => {
    fetchTaskAPI();
  }, []);
 
  const fetchTaskAPI = () => {
    begin('fetchTaskAPI');
    setLoading(true);
    const requestBody = {};
    singleton
      .createRequest(requestBody, Constants.taskCreatedBymeAPI, Method.GET)
      .then(response => response.json())
      .then(async responseJson => {
        dumpLog(responseJson);
        if(responseJson.success == true){
          setTaskList(responseJson.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dumpError(error);
        end('fetchTaskAPI');
      });
  };

  const renderItem = ({item, index}:{item:ITask, index:number}) => {
    return <TaskItem item={item} index={index} props={props}  />
  }

  return (
    <View style={{ flex: moderateScale(1) }}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        translucent={false}
      />
      <MyTaskHeader props={props} currentScreen={CurrentScreen.MY_TASK} /> 
      {
        taskList && taskList.length > 0 ? (
          <FlatList
            key={'' + taskList?.length}
            extraData={taskList?.length}
            horizontal={false}
            numColumns={1}
            data={taskList}
            renderItem={renderItem}
            keyExtractor={(data: ITask, index:number) =>
              '' + data.id + index
            }   
          />
        ) : 
        taskList?.length == 0 ? <Empty /> : null 
      } 
      <ActivityIndicator
        animating={loading == true}
        color={Color.blackColor}
        size="large"
        style={{alignSelf: 'center', position: 'absolute', justifyContent: 'center', bottom: 300}}
      />
    </View> 
  );
}

export default MyTask;