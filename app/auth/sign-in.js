import { useState, useEffect} from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
  } from "react-native";
  import {useRouter } from "expo-router";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import * as Clipboard from 'expo-clipboard';
  import {Styles, Textstyle, Gap} from '../utils';
  
  export default function SignIn() {

    const [expoToken, setToken] = useState('');
    const [copyToken, setCopiedText] = useState('');
  
    const router = useRouter();
    useEffect(() => {
      getToken();
    }, [])

    const getToken = async () => {
      await AsyncStorage.getItem('myToken').then((token) => {
        setToken(token);
      })
    }

    const onlogOut = async() => {
      await AsyncStorage.removeItem('myToken').then(() => {
        router.push('/')
      })
    }

    // FUNCT OF CLIPBOARD
    const oncopiedText = async (data) => {
      await Clipboard.setStringAsync(data);
    };
    const pasteText = async () => {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    };
  
    return (
      <View  style={Styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={expoToken}
            style={Styles.textInputsign}
            multiline
          />
          <Gap width={10}/>
          <TouchableOpacity
            onPress={() => oncopiedText(expoToken)}
            style={Styles.buttonPaste}
          >
            <Text style={Textstyle.textBold}>COPY</Text>
          </TouchableOpacity>
        </View>
        <Gap height={30}/>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={copyToken}
            placeholder="-- CLIPBOARD --"
            style={[Styles.textInputsign, {height: 100}]}
            multiline
          />
          <Gap width={10}/>
          <TouchableOpacity
            onPress={() => pasteText()}
            style={Styles.buttonPaste}
          >
            <Text style={Textstyle.textBold}>PASTE</Text>
          </TouchableOpacity>
        </View>
        <Gap height={150}/>
        <TouchableOpacity
          style={Styles.buttonAction}
          onPress={() => onlogOut()}
        >
          <Text style={Textstyle.textBold}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }