import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupView() {
  const navigation = useNavigation();

    const roleOptions = [
      { role: 'Student', value: 'student' },
      { role: 'Teacher', value: 'teacher' }
    ];

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const validateSignup = () => {
        if (!username || !email || !password) {
            Alert.alert('Signup Error', 'Required fields are not filled in!');
            return false;
        }
        if (!role) {
          Alert.alert('Signup Error', 'Please select a role');
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

        await setDoc(doc(db, "users", user.uid), {
          role: role
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

      <Dropdown
        data={roleOptions}
        labelField="role"
        valueField="value"
        placeholder='Select role'
        value={role}
        onChange={item => setRole(item.value)}
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <View style={{marginTop:25}}>
        <Text onPress={() => navigation.navigate('Login')}>Have an Account?</Text>
      </View>
    </View>
  );
}