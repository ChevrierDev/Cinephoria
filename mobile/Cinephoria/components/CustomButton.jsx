import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      style={[{ backgroundColor: 'rgba(16, 44, 87, 0.86)' }]}
      disabled={isLoading}
    >
      <Text className={`text-white font-arvo font-bold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;