import { Text, View, Button } from 'react-native';
import { auth, db } from '../services/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function ProfileView () {
    const [role, setRole] = useState('Waiting');
    const [user, setUser] = useState('');
    const [groups, setGroups] = useState([]);
    const [emailVerificationStatus, setEmailVerificationStatus] = useState('Waiting');

    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                if (user.emailVerified == 'verified') {
                    setEmailVerificationStatus('Verified');
                } else {
                    setEmailVerificationStatus('Unverified');
                }

                const q = query(
                    collection(db, "groups"),
                    where("members", "array-contains", user.uid)
                );

                const snap = await getDocs(q);
                let cleanList = [];
                snap.forEach((doc) => {
                    const docData = doc.data();

                    const combinedDocData = {
                        id: doc.id,
                        ...data
                    };
                    cleanList.push(combinedDocData);
                })
                setGroups(cleanList)
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("logged out");
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    return (
        <View>
            <Text>
                Name: {auth.currentUser.displayName}
            </Text>

            <Text>
                Email: {auth.currentUser.email}
            </Text>

            <Text>
                Photo: {auth.currentUser.photoURL}
            </Text>

            <Text>
                Verification Status: {emailVerificationStatus}
            </Text>
            <Text>Groups:</Text>
            {groups.map(item => (
                <View key={item.id} style={{ marginVertical: 5 }}>
                    <Text>{item.name} | DEBUG CODE REMOVE LATER: {item.inviteCode}</Text>
                </View>
            ))}

            <Button
            title='Logout' onPress={handleLogout}
            />
        </View>
    )
}