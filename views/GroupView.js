import { Text, View, Button } from 'react-native';
import React, { useState,useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function GroupView({ route }) {
    const { groupData } = route.params;
    const [memberNames, setMemberNames] = useState([]);

    useEffect(() => {
        const fetchMemberNames = async () => {
            const namePromises = groupData.members.map(async (uid) => {
                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists) {
                    return userSnap.data().displayName;
                } 
                else {
                    return "No Display Name";
                }
            });
            const names = await Promise.all(namePromises);
            setMemberNames(names);
        }
        if (groupData.members) {
            fetchMemberNames();
        }
    }, [groupData.members]);

    return (
        <View>
            <Text>
                {groupData.name}
            </Text>

            <Text>
                {groupData.id}
            </Text>

                {memberNames.length > 0 && 
                    memberNames.map((name, index) => (
                        <Text key={index}>
                            {name}
                        </Text>
                    ))
                }
        </View>
    )
}