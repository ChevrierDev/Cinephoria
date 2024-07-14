import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState }  from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <View className="relative flex-row items-center w-full ">
            <TextInput
                className="bg-white rounded-lg w-[80vw] h-16 px-4 items-center text-blueOne font-arvo"
                placeholder={placeholder}
                placeholderTextColor="rgba(16, 44, 87, 0.76)"
                value={value}
                onChangeText={handleChangeText}
                secureTextEntry={placeholder === 'Mot de passe' && !showPassword}
        />

            {placeholder === "Mot de passe" && (
                <TouchableOpacity onPress={() =>
                    setShowPassword(!showPassword)
                }
                className="absolute right-3">
                    <Image source={!showPassword ? icons.eye : icons.eyehide} 
                    className="w-6 h-6"
                    resizeMode='contain'/>
                </TouchableOpacity>
            )}
        </View>
    </View>
  );
};

export default FormField;