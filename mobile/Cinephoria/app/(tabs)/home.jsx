import { View, Text, SafeAreaView, FlatList, ImageBackground, RefreshControl, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';

import EmptyState from '../../components/EmptyState';
import MovieCard from '../../components/MovieCard';
import icons from '../../constants/icons';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken !== null) {
          setToken(savedToken);
          console.log('Token retrieved:', savedToken);
          fetchData(savedToken);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);

  const fetchData = async (token) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(await AsyncStorage.getItem('user-id'));
      const response = await axios.get(`http://192.168.1.9:3030/api/v1/reservation/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Data fetched:', response.data);
      setData(response.data.Data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (token) {
      fetchData(token);
    }
    setRefreshing(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user-id');
      const token = await AsyncStorage.getItem('token') && await AsyncStorage.getItem('user-id'); 
      console.log('Token after logout:', token); 
      setToken(null);
      router.push('/(auth)/sign-in'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      resizeMode="cover"
      className="flex-1 h-full"
    >
      <SafeAreaView className="h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.reservation_id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} /> 
          )}
          ListHeaderComponent={() => (
            <View className="my-10 px-4 space-y-6">
              <View className="mb-6">
                <TouchableOpacity onPress={logout}>
                  <Image source={icons.exit} className="w-8 h-8 mb-5" />
                </TouchableOpacity>
                <View>
                  <Text className="font-medium text-white text-center text-xl font-arvo">
                    Séances à venir
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="Aucune réservation trouvée"
              subtitle="Aucune réservation n'a été effectuée"
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
