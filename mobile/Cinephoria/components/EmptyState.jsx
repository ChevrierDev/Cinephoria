import { View, Text, Image } from 'react-native'
import React from 'react'

import images from '../constants/images'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
        <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode='contain'/>
        <Text className="font-medium text-sm text-white">{title}</Text>
        <Text className="text-xl text-center font-semibold text-white mt-2">{subtitle}</Text>
    </View>
  )
}

export default EmptyState