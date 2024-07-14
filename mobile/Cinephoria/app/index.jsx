// app/index.jsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../constants/images';

const Index = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      resizeMode="cover"
      className="flex-1 h-full"
    >
      <SafeAreaView className="h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center items-center h-full px-4">
            <TouchableOpacity onPress={() => router.push('sign-in')}>
              <Image
                source={images.logo}
                className="w-[100px] h-[300px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Index;