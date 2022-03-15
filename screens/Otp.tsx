import React, { useState, useEffect } from "react";
import { SafeAreaView, PermissionsAndroid, StyleSheet, Button, Text } from "react-native";

import { checkVerification } from "../api/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const API_URL = 'https://node-auth-sanjeevdg.herokuapp.com';
import Geolocation from 'react-native-geolocation-service';

const Otp = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);


const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
        const [latitude, setLatitude] = useState(0.00001);
            const [longitude, setLongitude] = useState(0.00001);

const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                  console.log('user logged in redirecting to private resource'+jsonRes.message+res.status);
                  //  setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log('caught error-333333'+err);
            };
        })
        .catch(err => {
            console.log('caught error-44444'+err);
        });
    }


useEffect( () => {
 async function getLatLng() {
//console.log('granted='+granted);

console.log('useEffect called');
    const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'ReactNativeCode Location Permission2',
                  'message': 'ReactNativeCode App needs access 22 your location '
              })
  
          if (granted === 'granted') {

Geolocation.getCurrentPosition(
            (position) => {

        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

});
}
}

getLatLng();

},[latitude]);  //end use effect// 


  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter the code we sent you</Text>
      <Text style={styles.message}>
        {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
      </Text>
      <Button
        title="Edit Phone Number"
        onPress={() => navigation.replace("PhoneNumber")}
      />
      <OTPInputView
        style={{ width: "80%", height: 200,border:1 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={async (code) => {
          checkVerification(phoneNumber, code).then((success) => {
            if (!success) {
              setInvalidCode(true);
            }
            else {




setTimeout(() => {

        const payload = {
            email:'testing@san.com',
            name:'san6',
            password:'12345678',
            latitude:latitude,
            longitude:longitude,           
        };

        fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        .then(async res => { 
            try {
        
                const jsonRes = await res.json();
                if ( res.message === "email already exists") {
//do nothing - backend will handle it 
               } else {

  const payload2 = {
            email:'testing@san.com',
            password:'12345678',
        };
  fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload2),
        })
        .then(async res2 => { 
                const jsonRes2 = await res2.json();


                if (res2.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes2.message);
                } else {
                    onLoggedIn(jsonRes2.token);
                  }

          });

             
                }
            } catch (err) {
                console.log('caught error-11111'+err);
            };
        })
        .catch(err => {
            console.log('caught error-22222'+err);
        });


},9000);

success && navigation.replace("MyScreen",{screen:"Notifications"});

}
          }).catch(err => {console.log('caught err::'+err.message)}); // end checkVerification
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default Otp;
