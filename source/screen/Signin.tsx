import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import Internet from './Internet';
import NetInfo from '@react-native-community/netinfo';
import {Constants} from '../constants/Constants';
import {Singleton} from '../constants/Singleton';
import {dumpError, dumpLog} from '../utility/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILoginResponse, Method} from '../types/custom-type';
import Header from '../components/Header';

const Signin = (props: any) => {
  const {navigation, route} = props;

  const [email, setEmail] = useState({
    value: Constants.defaultEmailId,
    error: '',
  });
  const [password, setPassword] = useState({
    value: Constants.defaultPassword,
    error: '',
  });
  const [isConnected, setConnected] = useState<boolean | null>(true);

  const [singleton, setSingleton] = useState<Singleton>(
    Singleton.getInstance(),
  );

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    const requestBody = {
      email: email.value,
      password: password.value,
    };

    singleton
      .createRequest(requestBody, Constants.loginAPI, Method.POST)
      .then(response => response.json())
      .then(async responseJson => {
        dumpLog(responseJson);
        //handle response and print and check
        const responseObject: ILoginResponse = responseJson;
        if (responseObject.success && responseObject.success == true) {
          singleton.setAuthorization(responseObject.token);
          await AsyncStorage.setItem(Constants.tokenKey, responseObject.token);
          navigation.reset({
            index: 0,
            routes: [{name: 'dashboard'}],
          });
        } else {
          singleton.showShortSnackbar(responseJson.msg);
        }
      })
      .catch(error => dumpError(error));
  };

  return isConnected == null || isConnected == false ? (
    <Internet />
  ) : (
    <Background>
      <Header>
        Welcome To {'\n'} Department of Education{'\n'} My Task Management System
      </Header>
      <Logo />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: any) => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={''}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: any) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        description={''}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('reset-password')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button style={{}} mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <Image source={require('../assets/team_head.png')} style={styles.image} />
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  image: {
    width: '100%',
    height: '15%',
  },
});

export default Signin;
