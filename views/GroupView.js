import { Text, View, Button, Modal, Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, addDoc, query, where, snapshot} from 'firebase/firestore';
import { db } from '../services/firebase';

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

    useEffect(() => {
        const q = query(collection(db, "assignments"), where("groupId", "==", groupData.id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAssignments(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });
        return () => unsubscribe();
    }, [groupData.id]);

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

            <View>
                <View style={{height:400}}>
                    <Map onLongPress={onLongPress}>
                        {assignments.map((item) => (
                            <AssignmentMarker key={item.id} assignment={item}/>
                        ))}
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
        </View>
    )
}