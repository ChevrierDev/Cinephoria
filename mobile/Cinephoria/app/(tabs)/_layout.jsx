import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View>
      <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
      />
      <Text className={"``"}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home', 
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
                />
            ),
            tabBarStyle: { display: 'none' },
          }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout