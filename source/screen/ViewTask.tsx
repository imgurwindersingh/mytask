import React, { useState } from 'react';
import { Singleton } from '../constants/Singleton';
import { IAllDOEItem, CurrentScreen, ITaskItem, ITask } from '../types/custom-type';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { StatusBar } from 'react-native';
import MyTaskHeader from '../components/MyTaskHeader';
import { moderateScale } from 'react-native-size-matters';
import { Color } from '../constants/Color'; 
import Empty from '../components/Empty'; 
import DOETaskItem from '../components/DOETaskItem';

const ViewTask = (props: any) => {

  const { navigation } = props;
 
  const [singleton, setSingleton] = useState<Singleton>(
    Singleton.getInstance(),
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [taskList, setTaskList] = useState<ITaskItem[]>();

  useEffect(() => {
    let arrayObject = [];
    for(let idx=0; idx<40; idx++){
        const id = (idx+1);
        let data: ITaskItem  = {
            taskid: 'TASKID'+id,
            taskname: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            username: 'User ' + (id > 9 ? id : '0' + id),
            points: id,
            date: '1'+id+'-07-2021'
        }
        arrayObject.push(data);
    }
    setTaskList(arrayObject);
    setLoading(false);
  }, []);

  const renderItem = ({item, index}:{item:ITaskItem, index:number}) => {
    return <DOETaskItem navigation={navigation} props={props} item={item} />
  }
   
  return (
    <View style={{ flex: moderateScale(1) }}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        translucent={false}
      />
      <MyTaskHeader props={props} currentScreen={CurrentScreen.VIEW_TASKS} /> 
      {
        taskList && taskList.length > 0 ? (
            <FlatList
                key={'' + taskList?.length}
                extraData={taskList?.length}
                horizontal={false}
                numColumns={1}
                data={taskList}
                renderItem={renderItem}
                keyExtractor={(data: ITaskItem, index:number) =>
                '' + data.taskid + index
                }   
            />
        ) 
        : 
        taskList?.length == 0 ? <Empty /> : null
      }
      <ActivityIndicator
        animating={loading}
        color={Color.blackColor}
        size="large"
        style={{alignSelf: 'center', position: 'absolute', justifyContent: 'center', bottom: 300}} />
    </View>
  );
}

export default ViewTask;