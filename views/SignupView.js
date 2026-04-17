import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function SignupView() {
  const navigation = useNavigation();

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

    const handleSignup = async () => {
      if (!validateSignup()) {
        return;
      }
      
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: username
        });

        console.log("User created", user.email);
      } 
      catch (error) {
        console.log(error.message);
      }
      
      Alert.alert('Success', `Logged in as ${username}`, [
            {
                text: 'Continue',
                onPress: () => navigation.navigate('Login')
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
      <View style={{marginTop:25}}>
        <Text onPress={() => navigation.navigate('Login')}>Have an Account?</Text>
      </View>
    </View>
  );
}