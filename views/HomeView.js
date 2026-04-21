import { useNavigation } from '@react-navigation/native';
import { Text, Button, View } from 'react-native';
import { CreateGroup } from '../services/groupService';
import React, { useEffect, useState } from 'react';
import { auth, db} from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeView () {
    const navigation = useNavigation();
    const [role, setRole] = useState(null);
    const [loadingRoles, setLoadingRoles] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setRole(userDoc.data().role);
                    }
                }
            } catch (err) {
                console.log("Error w fetching roles:", err);
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <View>
            <Text>Your role is {role}</Text>
            <Button
                title='Login'
                onPress={() => navigation.navigate('Login')}
            />
                
            <Button
                title='Signup'
                onPress={() => navigation.navigate('Signup')}    
            />

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