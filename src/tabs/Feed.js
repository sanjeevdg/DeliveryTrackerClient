import React from 'react'
import {
    SafeAreaView,
    View,
    Text    
  } from 'react-native';
import {Button} from 'react-native-elements';
function Feed(props) {
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100,width:300,marginLeft:20 }} >
                <Text style={{fontSize:20}}>Click the button below to get a list of Pickup Persons closest to you.</Text>
                
<Button
            onPress={() => props.navigation.navigate('Post Details')}
            icon={{
                  name: 'search',
                  type: 'font-awesome',
                  size: 19,                  
                }}
                iconLeft
                iconContainerStyle={{ marginLeft: 10 }}                
            containerStyle={{
                  width: 220,marginLeft:10,                  
                }}
            buttonStyle={{
                  borderColor: 'rgba(78, 116, 289, 1)',
                  borderRadius:30
                }}
                type="outline"
                title="Search Neighborhood"
                titleStyle={{ color: 'rgba(199, 43, 98, 1)' }}
              /> 

                
            </View>
        </SafeAreaView>
    )
}

export default Feed