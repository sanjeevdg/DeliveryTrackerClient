import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PhoneInput from "react-native-phone-number-input";

import { sendSmsVerification } from "../api/verify";

const PhoneNumber = ({ route, navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

  return (

<ImageBackground source={require('../images/app-bg-blue2.jpg')} style={styles.image}>

        
    <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.welcome}>
            <Text style={{color:"black",fontSize:25}}>Enter Phone Number</Text>
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            style={{border:1,paddingBottom:10}}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            withShadow
            autoFocus
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              sendSmsVerification(formattedValue);
              navigation.navigate("Otp", { phoneNumber: formattedValue });
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
         
    </ImageBackground>
  );
};

// backgroundColor: Colors.lighter,

const styles = StyleSheet.create({
  container: {
    flex: 1,        
	  },
image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    }, 
  wrapper: {
    flex: 1,
    paddingTop:300,
    justifyContent: "center",
    alignItems: "center",
    border:1,
  },

  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    border:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  },

  welcome: {
    padding: 20,
    textColor:"black",
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "gray",
  },
});

export default PhoneNumber;
