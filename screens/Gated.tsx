
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, PermissionsAndroid, StyleSheet, Button, Text } from "react-native";
import Geolocation from 'react-native-geolocation-service';
const API_URL = 'https://node-auth-sanjeevdg.herokuapp.com';

import NewPost from '../src/tabs/NewPost'
//import { Button, ThemeProvider } from 'react-native-elements';

const Gated = ({ navigation }) => {

const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
        const [latitude, setLatitude] = useState(0.00001);
            const [longitude, setLongitude] = useState(0.00001);


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


const AuthInitialize = () => {


setTimeout(() => {
console.log('statelatis:::::::::22222222'+latitude);
// `${phoneNumber}`
const payload = {
            email:'testing@san.com',
            name:'san6',
            password:'12345678',
            latitude:latitude,
            longitude:longitude,           
        };
console.log('uri='+`${API_URL}/signup`);
 
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
console.log('response='+JSON.stringify(jsonRes));

                if ( res.message === "email already exists") {
                  //  setIsError(true);
                    console.log('entered error loop body......');
                  //  setMessage(jsonRes.message);
                } else {
console.log('create user success - trying to log user in now.....pls wait...');

// `${phoneNumber}`


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
                    console.log('entered second error loop....'+jsonRes2.message+res2.status);
                    setMessage(jsonRes2.message);
                } else {
console.log('login user success if you can see this message...');
                  //  onLoggedIn(jsonRes2.token);
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




}
AuthInitialize();

  return (
    <SafeAreaView style={styles.wrapper}>


    <Text>Hello there </Text>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Gated;
