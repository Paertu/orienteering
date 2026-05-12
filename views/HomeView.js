import { useNavigation } from '@react-navigation/native';
import { Text, Button, View } from 'react-native';
import { CreateGroup } from '../services/groupService';
import React, { useEffect, useState } from 'react';
import { auth, db} from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


export default function HomeView () {
    const navigation = useNavigation();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscribeToUserRole = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setRole(userDoc.data().role);
                    } else {
                        console.log("No doc found in db");
                    }
                } catch (err) {
                    console.log("Error w fetching roles:", err);
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => subscribeToUserRole();
    }, []);

    return (
        <View>
            <Text>Your role is {role}</Text>
            {(role !== 'student' && role !== 'teacher') && (
                <Button
                    title='Login'
                    onPress={() => navigation.navigate('Login')}
                />          
            )}
            
            {(role !== 'student' && role !== 'teacher') && (
                <Button
                    title='Signup'
                    onPress={() => navigation.navigate('Signup')}    
                />    
            )}          

            {role === 'teacher' && (
                <Button
                    title='Create new group'
                    onPress={() => navigation.navigate('CreateGroup')}
                />
            )}

            {role === 'student' && (
                <Button
                    title='Join new group'
                    onPress={() => navigation.navigate('JoinGroup')}
                />
            )}

        </View>
    )
}