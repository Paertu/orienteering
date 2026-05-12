import React, { useState} from 'react';
import { View, TextInput, Button, Alert, Modal } from 'react-native';
import { CreateGroup } from '../services/groupService';
import { auth } from '../services/firebase';
import { Invite } from '../src/components/Invite';
import { useNavigation } from '@react-navigation/native';

export default function CreateGroupView() {
    const [groupName, setGroupName] = useState('');
    const [modalVisible, setModalVisible] = useState('');
    const [result, setResult] = useState({code: '', name: ''});

    const navigation = useNavigation();

    const handleCreate = async () => {
        try {
            const teacherId = auth.currentUser.uid;
            const data = await CreateGroup(teacherId,groupName);

            setResult({code:data.inviteCode, name:groupName})
            setModalVisible(true);
            setGroupName('');
            Alert.alert("Success", `Created group '${data.groupName}' `, [
                            {
                                text: 'Continue',
                                onPress: () => navigation.navigate('Profile')
                            }
                        ]);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    return (
        <View>
            <TextInput
                placeholder='Group name'
                value={groupName}
                onChangeText={setGroupName}
            />
            <Button title='Create group' onPress={() => {
                handleCreate();
            }}
            />

            <Invite
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                inviteCode={result.code}
                groupName={result.name}
            />
        </View>
    )
}