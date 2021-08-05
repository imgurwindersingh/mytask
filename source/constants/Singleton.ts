import {
  dumpError,
  dumpLog,
  dumpRequest,
  dumpResponse,
} from '../utility/Utility';
import {Linking, Platform, PlatformOSType} from 'react-native';
import date from 'date-and-time';

import {Dimensions} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {Color} from './Color';
import {Font} from './Font';
import {Constants} from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Method} from '../types/custom-type';

export class Singleton {
  private windowWidth = Dimensions.get('window').width;
  private windowHeight = Dimensions.get('window').height;

  private static instance: Singleton | undefined;
  private authorization: string | undefined;

  constructor() {}

  public static getInstance(): Singleton {
    // dumpLog('this.instance : ', this.instance);
    if (this.instance == undefined || this.instance == null) {
      this.instance = new Singleton();
    }
    return this.instance;
  }

  getWindowWidth(): number {
    this.windowWidth = Dimensions.get('window').width;
    return this.windowWidth;
  }

  getWindowHeight(): number {
    this.windowHeight = Dimensions.get('window').height;
    return this.windowHeight;
  }

  public showShortSnackbar(text: string) {
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Ubuntu-Medium',
      backgroundColor: Color.whiteColor,
      textColor: '#FF0000',
    });
  }

  public getPlatform(): PlatformOSType {
    return Platform.OS;
  }

  public showLongSnackbar(text: string) {
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_LONG,
      fontFamily: Font.fontMedium,
      backgroundColor: Color.whiteColor,
      textColor: '#FF0000',
    });
  }

  public showSnackbar(text: string) {
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_INDEFINITE,
      fontFamily: Font.fontMedium,
      backgroundColor: Color.whiteColor,
      textColor: '#FF0000',
    });
  }

  public openURL(url: string): void {
    if (this.checkString(url) == true) {
      Linking.openURL(url);
      return;
    } else {
      this.showShortSnackbar('Invalid URL');
    }
  }

  public checkString(value: string | undefined): boolean {
    if (
      value != undefined &&
      value != null &&
      value != 'null' &&
      value != '' &&
      value != 'Undefined' &&
      value != 'undefined' &&
      value != 'Default' &&
      value != 'default'
    ) {
      return true;
    }
    return false;
  }

  public checkNumber(value: any): boolean {
    if (value != undefined && value != null && value != 'null' && value != 0) {
      return true;
    }
    return false;
  }

  public checkBoolean(value: any): boolean {
    if (
      (value != undefined &&
        value != null &&
        value != 'false' &&
        value == 'true') ||
      value == true
    ) {
      return true;
    }
    return false;
  }

  public getDBDateTimeToUIDateTimeFormat(time: string): string {
    // @ts-ignore
    return date?.transform(
      time.replace('Z', ''),
      'YYYY-M-D HH:mm:ss',
      'MMM D, YYYY hh:mm A',
    );
  }

  public getDBTimeToUITimeFormat(time: string): string {
    // @ts-ignore
    return date?.transform(time, 'HH:mm:ss', 'hh:mm A');
  }

  public getDateToDBDateFormat(date: Date): string {
    // due converting number to string it's any type
    let dd: any = date.getDate();
    // due converting number to string it's any type
    let mm: any = date.getMonth() + 1;
    let yyyy: number = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  private checkTime(i: any): any {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  public getDateToDBTimeFormat(date: Date): string {
    let h: any = date.getHours();
    let m: any = date.getMinutes();
    let s: any = date.getSeconds();
    // add a zero in front of numbers<10
    h = this.checkTime(h);
    m = this.checkTime(m);
    s = this.checkTime(s);
    return h + ':' + m + ':' + s;
  }

  public printDateTime(date: Date): void {
    dumpLog('date : ', date);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    dumpLog('dd   : ', dd);
    dumpLog('mm   : ', mm);
    dumpLog('yyyy : ', yyyy);
    dumpLog('h    : ', h);
    dumpLog('m    : ', m);
    dumpLog('s    : ', s);
  }

  public convertMillisToMinutesAndSeconds(millis: number) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + 'm' + ' ' + seconds + 's';
  }

  public logout(navigation:any):void {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'sign-in'}],
    });
  }

  public createRequest(
    body: any,
    url: string,
    method: Method,
  ): Promise<Response> {
    const requestObject: RequestInit = {
      method: method,
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        Authorization: this.authorization ? this.authorization : '',
      },
    };
    if (method == Method.POST) {
      requestObject.body = JSON.stringify(body);
      requestObject.headers = {
        Authorization: this.authorization ? this.authorization : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    dumpRequest(url, requestObject);
    return fetch(url, requestObject);
  }

  getAuthorization(): string | undefined | null {
    return this.authorization;
  }

  setAuthorization(authorization: string | undefined): void {
    this.authorization = 'Bearer ' + authorization;
  }

  public async checkSigninStatus(): Promise<boolean> {
    try {
      const token: any = await AsyncStorage.getItem(Constants.tokenKey);
      this.setAuthorization(token);
      return this.checkString(token) ? true : false;
    } catch (e) {
      // error reading value
      dumpError(e);
      return false;
    }
  }

  public async checkStarterStatus(): Promise<boolean> {
    try {
      const isStarter: any = await AsyncStorage.getItem(Constants.starterKey);
      return this.checkString(isStarter) ? true : false;
    } catch (e) {
      dumpError(e);
      return false;
    }
  }
}
