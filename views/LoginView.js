import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginView() {
    const navigation = useNavigation();

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

    const handleLogin = async () => {
        if (!validateLogin()) {
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredential.user;

            console.log("User logged in", user.displayName);

            await syncUserNameWithDb(user);

            Alert.alert('Login Success', `Logged in with ${user.email}`, [
                {
                    text: 'Continue',
                    onPress: () => navigation.navigate('Main')
                }
            ]);
        }
        catch (error){
            console.log(error.message);
        }
    }

    const syncUserNameWithDb = async (user) => {
        console.log("Attempting to sync user name with db");
        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
        }, {merge:true});
        console.log("Merged db for", user.displayName);
    };

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
                secureTextEntry={true}
            />
          <Button title="Log in" onPress={handleLogin} />
          <Text onPress={() => navigation.navigate('Signup')}>Create Account?</Text>
        </View>
    )
}