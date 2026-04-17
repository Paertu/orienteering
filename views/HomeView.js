import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, View } from 'react-native';

export default function HomeView () {
    const navigation = useNavigation();

    return (
        <View>
            <Button
                title='Login'
                onPress={() => navigation.navigate('Login')}
            />
                
            <Button
                title='Signup'
                onPress={() => navigation.navigate('Signup')}    
            />

        </View>
    )
}