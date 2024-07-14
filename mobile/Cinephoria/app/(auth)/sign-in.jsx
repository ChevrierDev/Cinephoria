import { View, Text, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setIsSubmitting(true);
    console.log('Attempting to submit form with:', form);

    try {
      const serverUrl = 'http://192.168.1.9:3030/api/v1/auth';
      console.log('Sending request to', serverUrl);
      
      const response = await axios.post(serverUrl, {
        email: form.email,
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-React-Native-Request': 'true'
        }
      });

      const data = response.data;
      console.log('Response data:', data);

      if (data.accessToken) {
        // Enregistrer le token dans AsyncStorage
        const id = JSON.stringify(data.id)
        await AsyncStorage.setItem('token', data.accessToken);
        await AsyncStorage.setItem('user-id', id);
        console.log('Token saved:', data.accessToken);
        console.log('Id saved:', data.id);
        if (data.redirectUrl) {
          router.push(data.redirectUrl); 
        } else {
          router.push('home');
        }
      } else {
        Alert.alert('Error', 'Token not received');
      }
    } catch (error) {
      console.error('Error during sign-in', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        console.log('Error request:', error.request);
        Alert.alert('Error', 'Network error: No response received');
      } else {
        console.log('Error message:', error.message);
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      resizeMode="cover"
      className="flex-1 h-full"
    >
      <SafeAreaView className="h-full items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              className="w-[100px] h-[120px] mx-auto mt-20"
              resizeMode="contain"
            />

            <FormField
              placeholder="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-20"
              keyboardType="email-address"
            />

            <FormField
              placeholder="Mot de passe"
              otherStyles="mt-4"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              secureTextEntry
            />

            <TouchableOpacity onPress={submit}>
              <CustomButton
                title="Connexion"
                handlePress={submit}
                containerStyles="mt-16"
                isLoading={isSubmitting}
              />
            </TouchableOpacity>

            <View className="justify-center items-center mt-12">
              <Text className="font-arvo font-arvo-bold text-white">Mot de passe oublié ?</Text>
              <Text className="text-white text-xxs text-center opacity-50 mt-32">2000-2024 © Cinéphoria</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;