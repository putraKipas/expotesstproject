import { useState, useEffect, useRef } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
  } from "react-native";
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {useRouter} from "expo-router";
import {Styles, Textstyle, Gap} from './utils';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'WELLCOME TO TEST PROJECT',
      body: 'Hey Loggin Succesfully',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  async function registerForPushNotificationsAsync() {
  let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    return token;
  }

  export default function TestIn() {
    
    const router = useRouter();
    const [name, setName] = useState(null);
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const storeData = () => {
      if(name){
        registerForPushNotificationsAsync().then((token) => {
          sendPushNotification(token.data);
          AsyncStorage.setItem('myToken', token.data)
            router.push('auth/sign-in')
          });
      } else {
        Alert.alert('ERROR', "Hello, Please Input Your Name !")
      }
    };

    useEffect(() => {
      AsyncStorage.getItem('myToken').then((token) => {
        if(token){
          router.push('auth/sign-in')
        }
      })

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        // console.log('notification', notification);
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() here if needed for your purposes
        console.log(`Error fetching latest Expo update: ${error}`);
      }
    }  

    const buttonComponent = (tittle, onPress) => {
      return(
      <TouchableOpacity
        style={Styles.buttonAction}
        onPress={onPress}
      >
        <Text style={Textstyle.textBold}>
          {tittle}
        </Text>
      </TouchableOpacity>
      )
    }

    return (
      <View style={Styles.container}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>LOGIN TEST PROJECT</Text>
        </View>
        <Gap height={100}/>
        <TextInput
          placeholder="Please Input Nick Name !"
          style={Styles.textInput}
          value={name}
          onChangeText={setName}
        />
        <View style={{height: 200}}/>
        {buttonComponent("LOGIN", () => storeData())}
        <View style={{height: 20}}/>
        {buttonComponent("Check Manually", () => onFetchUpdateAsync())}
      </View>
    );
  }
