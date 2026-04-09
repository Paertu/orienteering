import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function SignupView() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateSignup = () => {
        if (!username || !email || !password) {
            Alert.alert('Signup Error', 'Required fields are not filled in!');
            return;
        }

        const validateEmail = () => {
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!pattern.test(email)) {
                Alert.alert('Email error', 'Inserted Email address is not a valid format!');
                return;
            }
        }

        Alert.alert('Success', `Logged in, ${username}`, [
            {
                text: 'Continue'
            }
        ]);
    }
    return (
    <View>
      <Text>Sign Up</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={validateSignup} />
    </View>
  );

}