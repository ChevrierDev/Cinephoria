import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
  <>
    <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
    </Stack>

    <StatusBar style="light"/>
  </>
  )
}

export default AuthLayout