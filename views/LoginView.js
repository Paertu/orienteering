import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function loginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateLogin = () => {
        if (!email) {
            Alert.alert('Login Error', "Email is not valid");
            return false;
        }

        if (!password) {
            Alert.alert('Login Error', 'Invalid password');
            return false;
        }      
        return true;
    }

    const handleLogin = () => {
        if (!validateLogin()) {
            return;
        }
        Alert.alert('Login Success', `Logged in with ${$email}`, [
            {
                text: 'Continue'
            }
        ]);
    }
    return (
        <View>
            <Text>Login</Text>

            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
            />
          <Button title="Log in" onPress={validateLogin} />
          <Text>Create Account?</Text>
        </View>
    )
}