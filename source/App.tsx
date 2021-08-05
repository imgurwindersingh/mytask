import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {Image, Platform, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {Color} from './constants/Color';
import {Font} from './constants/Font';
import Signin from './screen/Signin';
import ResetPassword from './screen/ResetPassword';
import Dashboard from './screen/Dashboard';
import {Button, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import CreateTask from './screen/CreateTask';
import TaskCreatedToday from './screen/TaskCreatedToday';
import MyOverdueTasks from './screen/MyOverdueTasks';
import Reports from './screen/Reports';
import AllDOEScores from './screen/AllDOEScores';
import MyTask from './screen/MyTask';
import MyAssignedTasks from './screen/MyAssignedTasks';
import TaskDueIn3Days from './screen/TaskDueIn3Days';
import {Singleton} from './constants/Singleton';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from './constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import ViewTask from './screen/ViewTask';
import SupportStaffTasks from './screen/SupportStaffTasks';

const slides = [
  {
    key: 1,
    title: 'SAVE THE TIME',
    text: 'We Must Complete The task \n As Soon As Possible',
    image: require('./assets/savethetime.jpg'),
    backgroundColor: Color.applicationColor,
  },
  {
    key: 2,
    title: 'INSPIRATIONAL',
    text: 'A Comfortable Working Environment \n Can Be A Great Inspiration',
    image: require('./assets/inspirational.jpg'),
    backgroundColor: Color.applicationColor,
  },
  {
    key: 3,
    title: 'TEAMWORK',
    text: 'Teamwork Helps Improve \n Your Work Sills',
    image: require('./assets/teamwork.jpg'),
    backgroundColor: Color.applicationColor,
  }
];

const Authentication = (props: any) => {
  const {navigation} = props;

  const [singleton] = useState<Singleton>(Singleton.getInstance());

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    if ((await singleton.checkSigninStatus()) == true) {
      navigation.reset({
        index: 0,
        routes: [{name: 'dashboard'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'sign-in'}],
      });
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontFamily: 'Ubuntu-Medium', alignSelf: 'center'}}>
        Authenticating...
      </Text>
      <ActivityIndicator
        size={'large'}
        animating={true}
        color={Color.redColor}
        style={{position: 'absolute', alignSelf: 'center', bottom: '50%'}}
      />
    </View>
  );
};

const App = () => {

  const [showRealApp, setShowRealApp] = useState<boolean>();
  const [singleton, setSingleton] = useState<Singleton>(Singleton.getInstance());

  useEffect(() => {
    checkData();
  }, []);

  const checkData = async () => {
    if ((await singleton.checkStarterStatus()) == true) {
      setShowRealApp(true);
    } else {
      setShowRealApp(false);      
    }
    SplashScreen.hide();
  }

  const onDone = async () => {
    await AsyncStorage.setItem(Constants.starterKey, "1");
    setShowRealApp(true);
  };

  const onSkip = async () => {
    await AsyncStorage.setItem(Constants.starterKey, "1");
    setShowRealApp(true);
  };

  const renderItem = ({item}:{item:any}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          paddingBottom: 100, 
        }}>
        <View style={{width: '100%', height: '50%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center'}}>
          <Image style={styles.introImageStyle} source={item.image} />
        </View>
        <View style={{width: '100%', height: '50%', backgroundColor: 'white'}}>
          <View style={{width: '100%', height: '30%', backgroundColor: Color.redColor, paddingTop: moderateScale(30)}}>
            <Text style={styles.introTitleStyle}>{item.title}</Text>
          </View>
          <View style={{width: '100%', height: '70%', backgroundColor: Color.applicationColor, paddingTop: moderateScale(50)}}>
            <Text style={styles.introTextStyle}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  const Drawer = createDrawerNavigator();

  return showRealApp ?
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={Color.whiteColor} />
        <Drawer.Navigator
          initialRouteName="auth"
          drawerContentOptions={{
            labelStyle:{fontFamily: Font.fontMedium, fontSize: moderateScale(12), color: Color.whiteColor},
            activeBackgroundColor:Color.navigationActiveItemColor,
            inactiveBackgroundColor: Color.navigationBackground,
            activeTintColor: Color.whiteColor,
            inactiveTintColor: Color.ashColor,
          }}
          drawerStyle={{backgroundColor: Color.navigationBackground}}
          drawerContent={props => {
            const filteredProps = {
              ...props,
              state: {
                ...props.state,
                routeNames: props.state.routeNames.filter(
                  // To hide single option
                  // (routeName) => routeName !== 'HiddenPage1',
                  // To hide multiple options you can add & condition
                  routeName => {
                    routeName !== 'sign-in' &&
                      routeName !== 'reset-password' &&
                      routeName !== 'auth' && 
                      routeName !== 'doe-task-view';
                  },
                ),
                routes: props.state.routes.filter(
                  route =>
                    route.name !== 'sign-in' &&
                    route.name !== 'reset-password' &&
                    route.name !== 'auth' && 
                    route.name !== 'doe-task-view',
                ),
              },
            };
            return (
              <DrawerContentScrollView {...filteredProps}>
                <DrawerItemList {...filteredProps} />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              header: () => null,
              title: 'Dashboard',
              drawerLabel: 'Dashboard',
              drawerIcon: () => 
              <FontAwesome 
                name="dashboard"
                size={20}
                color={Color.whiteColor}
              /> 
            }}
          />
          <Drawer.Screen
            name="all-doe-scores"
            component={AllDOEScores}
            options={{header: () => null, title: 'All DOE Scores',
            drawerLabel: 'All DOE Scores',
            drawerIcon: () => 
            <MaterialIcons 
              name="stars"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="create-task"
            component={CreateTask}
            options={{header: () => null, title: 'Create Task',
            drawerLabel: 'Create Task',
            drawerIcon: () => 
            <FontAwesome 
              name="check"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="my-task"
            component={MyTask}
            options={{header: () => null, title: 'My Task',
            drawerLabel: 'My Task',
            drawerIcon: () => 
            <FontAwesome 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          /> 
          <Drawer.Screen
            name="task-created-today"
            component={TaskCreatedToday}
            options={{header: () => null, title: 'All Tasks',
            drawerLabel: 'Tasks Created Today',
            drawerIcon: () => 
            <FontAwesome5 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="my-overdue-tasks"
            component={MyOverdueTasks}
            options={{header: () => null, title: 'All Points',
            drawerLabel: 'My Overdue Tasks',
            drawerIcon: () => 
            <FontAwesome5 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="my-assigned-tasks"
            component={MyAssignedTasks}
            options={{header: () => null, title: 'All Overdue Tasks',
            drawerLabel: 'My Assigned Tasks',
            drawerIcon: () => 
            <FontAwesome5 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="task-due-in-3-days"
            component={TaskDueIn3Days}
            options={{header: () => null, title: 'OverAll Tasks Report',
            drawerLabel: 'Task Due in 3 days',
            drawerIcon: () => 
            <FontAwesome5 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="support-staff-tasks"
            component={SupportStaffTasks}
            options={{header: () => null, title: 'OverAll Tasks Report',
            drawerLabel: 'Support Staff Tasks',
            drawerIcon: () => 
            <FontAwesome5 
              name="tasks"
              size={20}
              color={Color.whiteColor}
            /> }}
          />
          <Drawer.Screen
            name="auth"
            component={Authentication}
            options={{
              header: () => null,
              swipeEnabled: false,
              gestureEnabled: false,
            }}
          />
          <Drawer.Screen
            name="sign-in"
            component={Signin}
            options={{
              header: () => null,
              swipeEnabled: false,
              gestureEnabled: false,
            }}
          />
          <Drawer.Screen
            name="reset-password"
            component={ResetPassword}
            options={{
              header: () => null,
              swipeEnabled: false,
              gestureEnabled: false,
            }}
          />
          <Drawer.Screen
            name="doe-task-view"
            component={ViewTask}
            options={{header: () => null}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    :
      <AppIntroSlider
        data={slides}
        onDone={onDone}
        onSkip={onSkip}
        renderItem={renderItem} 
        dotStyle={{backgroundColor: Color.ashColor}}
        activeDotStyle={{backgroundColor: Color.whiteColor}}
        showNextButton={false}
        showSkipButton={true}
      />
  ;
};

const styles = StyleSheet.create({  
  introImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  introTitleStyle: {
    fontSize: 20,
    fontFamily: Font.fontMedium,
    color: 'white', 
    textAlign: 'center', 
  },
  introTextStyle: {
    fontSize: 14,
    color: 'white', 
    fontFamily: Font.fontRegular,
    width: '100%',
    height: '70%',
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default App;
