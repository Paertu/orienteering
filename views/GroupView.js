import { Text, View, Button, Modal, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, addDoc, query, where} from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { AssignmentItem, AssignmentMarker } from '../src/components/Assignment';
import Map from '../src/components/Map';
import { TextInput } from 'react-native';

export default function GroupView({ route }) {
    const { groupData } = route.params;
    const [memberNames, setMemberNames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [tempCoords, setTempCoords] = useState(null);
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [role, setRole] = useState(null);

    const navigation = useNavigation();
    
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
        });
        return () => subscribeToUserRole();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "assignments"), where("groupId", "==", groupData.id));
        const unsubscribe = onSnapshot(q, (snap) => {
            const fetchedData = (snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setAssignments(fetchedData);
            console.log("full db data:", JSON.stringify(fetchedData, null, 2));
        });
        return () => unsubscribe();
    }, [groupData.id]);

    useEffect(() => {
        const fetchMemberNames = async () => {
            const namePromises = groupData.members.map(async (uid) => {
                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
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

    const onLongPress = (e) => {
        const coords = e.nativeEvent.coordinate;
        setTempCoords(coords);
        setModalVisible(true);
    };

    const saveAssignment = async () => {
        if (!assignmentTitle) {
            return Alert.alert("Error", "no title");
        }

        try {
            await addDoc(collection(db, "assignments"), {
                groupId: groupData.id,
                title:assignmentTitle,
                coords: tempCoords,           
            });
            setModalVisible(false);
            setAssignmentTitle('');
            Alert.alert("Success", "Added assignment to map");
        } 
        catch (err) {
            console.log("Error saving", err);
        }
    };

    return (
        <View>
            <View>
                {role === 'student' && (
                    <Button
                        title='Open Map'
                        onPress={() => navigation.navigate('StudentView', {groupData} )}
                    />
                )}
                
            </View>
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


            {role === 'teacher' && (
            <View>             
                <View style={{height:400}}>
                    <Map onLongPress={onLongPress}>
                        {assignments && assignments.map((item) => {
                            if (!item.coords || typeof item.coords.latitude !== 'number') {
                                return null;
                            }
                            return (
                             <AssignmentMarker 
                                key={item.id} 
                                assignment={item}
                                showTooltip={true}
                            />   
                        );     
                    })}
                    </Map>
                </View>
                
                <Modal visible={modalVisible}>
                    <View>
                        <Text>Add Assignment</Text>
                        <TextInput
                            placeholder='Name'
                            value={assignmentTitle}
                            onChangeText={setAssignmentTitle}
                        />

                        <Button 
                            title='Save Assignment'
                            onPress={saveAssignment}
                        />
                        <Button 
                            title='Cancel'
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </Modal>
            </View>
            )}
        </View>
    )
}