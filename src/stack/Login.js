import React from 'react'
import {
    SafeAreaView,
    View,
    Button,
    Text
  } from 'react-native';

function Login(props) {
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 375 }} >
                <Text>Login</Text>
                <Button
                    title="Login"
                    onPress={props.login}
                />
            </View>
        </SafeAreaView>
    )
}

export default Login