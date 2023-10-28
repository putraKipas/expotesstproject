import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAction: {
    backgroundColor: "#841584",
    width: 300,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonPaste: {
    backgroundColor: "#841584",
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textInput: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,  
    width: 270
  },
  textInputsign: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    width: 200
  }
});

const Textstyle = StyleSheet.create({
  textBold: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold'
  },
});




export {Styles, Textstyle};
