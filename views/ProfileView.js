import { Text, View, Button } from 'react-native';
import { auth, db } from '../services/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileView () {
    const [role, setRole] = useState('Waiting');
    const [user, setUser] = useState('');
    const [emailVerificationStatus, setEmailVerificationStatus] = useState('Waiting');

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user !== null) {
                const userReference = doc(db, "users", user.uid);

                const docSnap = await getDoc(userReference);

                if (docSnap.exists()) {
                    setRole(docSnap.data().role)
                } 
                else {
                    setRole('Role is missing');
                }

                if (user.emailVerified) {
                    setEmailVerificationStatus('True');
                }
                else {
                    setEmailVerificationStatus('False');
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <View>
            <Text>
                Name: {auth.currentUser.displayName}
            </Text>

            <Text>
                Email: {auth.currentUser.email}
            </Text>

            {/* <Text>
                Photo: {auth.currentUser.photoURL}
            </Text> */}

            <Text>
                Verification Status: {emailVerificationStatus}
            </Text>
        </View>
    )
}