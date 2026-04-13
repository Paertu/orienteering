import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function SignupView() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateSignup = () => {
        if (!username || !email || !password) {
            Alert.alert('Signup Error', 'Required fields are not filled in!');
            return false;
        }

        const validateEmail = () => {
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return pattern.test(email);
        }
        if (!validateEmail()) {
          Alert.alert('Signup Error', 'Email is invalid!');
          return false;
        }  
        return true;      
    }

    const handleSignup = () => {
      if (!validateSignup()) {
        return;
      }
      Alert.alert('Success', `Logged in as ${username}`, [
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

      <Button title="Sign Up" onPress={handleSignup} />
      <Text>Have an Account?</Text>
    </View>
  );

}