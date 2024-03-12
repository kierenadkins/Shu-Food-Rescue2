import { View, Text, Image } from 'react-native'
import React from 'react'

export default function LeftHeader() {
    return (
        <View className ="ml-4" >
            <Image source={require('./../../../assets/logo-icon.png')} style={{ width: 50, height: 50 }} />
        </View>
    )
}