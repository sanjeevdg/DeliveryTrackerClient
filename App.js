import React from 'react';
import { Text,StyleSheet, View, Platform, PermissionsAndroid,Dimensions, SafeAreaView } from 'react-native';
import MapView, {PROVIDER_GOOGLE, AnimatedRegion,Marker, Polyline} from 'react-native-maps';

import haversine from "haversine";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.4901263;
const LONGITUDE = 88.3774978;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Geolocation from 'react-native-geolocation-service';
import getRealm from "./mongo/RealmConfig";
if (!window.location) {
    // App is running in simulator
    window.navigator.userAgent = 'ReactNative';
}

 import io from 'socket.io-client';
import {ObjectId} from 'bson';

const socket = io.connect("https://my-socket-web.herokuapp.com");


export default class Trackee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled:0.0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: 0.000,
        longitude: 0.000,
        latitudeDelta: 0.922,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      }),
        
    }
      this.socket = socket;
   
  }
  

  async componentDidMount() {


 this.socket.on('connect', () => { 
    console.log('connected to socket server'); 
  });
 this.socket.on('disconnect', () =>   this.socket.off('disconnect'));
 this.socket.on("connect_error", (err) => {
  console.log(`connect_error due111 to ${err.message}`);
});


//this.setState({realm:  realm });
//console.log('realm'+this.state.realm);
    this.watchLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {

try {


this.socket.on("FromAPI", data => {
      console.log('from server:'+data);
    });

this.socket.emit("setPosition",{"position":[this.state.routeCoordinates]});

this.socket.on("connect_error", (err) => {
  console.log(`connect_error compupdate due to ${err.message}`);
});


}
catch (e){console.log('logging this error::'+e.message);}

      console.log('component updated');

    }

  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  watchLocation = async () => {
let i=0;

    const { coordinate } = this.state;
    const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'ReactNativeCode Location Permission2',
                  'message': 'ReactNativeCode App needs access 22 your location '
              })
  console.log('granted='+granted);
        if (granted === 'granted') {

Geolocation.getCurrentPosition(
            (position) => {

        const { latitude, longitude } = position.coords;

            
this.setState({
          latitude,
          longitude,
        });     

this.setState({coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.922,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      })
});




            });

this.watchID = Geolocation.watchPosition(
      position => {
     
const { latitude, longitude } = position.coords;
const newCoordinate = {
          latitude,
          longitude,
        };
this.setState({routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])});

this.setState({distanceTravelled:
            this.state.distanceTravelled + this.calcDistance(newCoordinate),
           prevLatLng: newCoordinate
        });

 this.animate(latitude, longitude);


try {

getRealm().then(realm => {

//'606330ec76a88d04f5781bc5'
let pos1;
realm.write(() => {
  pos1 = realm.create("Position", {
    _id: new ObjectId(),
    latitude: latitude,
    longitude: longitude,
    timestamp: new Date(),
    realm_id:"621c4fbefd42ccd238ce7421",
  });

//return () => {
 // realm.close();
//}

})
const tasks = realm.objects("Position").sorted("timestamp");


//console.log('taskcount=='+JSON.stringify(tasks));
  console.log('pos1::'+JSON.stringify(pos1));
});

}

catch(err) {console.log('failed:(',err.message);} 


      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 0
      }
    );   

}
}

 calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

 animate = (latitude, longitude) => {
const newCoordinate = {latitude, longitude};


if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate, 500); // 500 is the duration to animate the marker
          }
        } else {  
      coordinate.timing({newCoordinate, useNativeDriver: true }).start();    
        }
}

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
         <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView style={styles.map} showUserLocation followUserLocation loadingEnabled region={this.getMapRegion()} provider={PROVIDER_GOOGLE}>
            <MapView.Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />

<Polyline
            coordinates={this.state.routeCoordinates}
            strokeColor="#bf8221"
            strokeColors={[
              '#bf8221',
              '#ffe066',
              '#ffe066',
              '#ffe066',
              '#ffe066',
            ]}
            strokeWidth={3}
     lineDashPattern={[0]}
          />


          </MapView>
          <Text>distanceTravelled:{this.state.distanceTravelled}</Text>
        </View>
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
