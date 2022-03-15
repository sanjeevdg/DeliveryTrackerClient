import React from 'react'
import {
    SafeAreaView,
    View,
    Text
  } from 'react-native';

function NewPost() {
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 375 }} >
                <Text>New Post</Text>
            </View>
        </SafeAreaView>
    )
}

export default NewPost