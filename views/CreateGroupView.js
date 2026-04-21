import React, { useState} from 'react';
import { View, TextInput, Button, Alert, Modal } from 'react-native';
import { CreateGroup } from '../services/groupService';
import { auth } from '../services/firebase';
import { Invite } from '../src/components/Invite';

export default function CreateGroupView() {
    const [groupName, setGroupName] = useState('');
    const [modalVisible, setModalVisible] = useState('');
    const [result, setResult] = useState({code: '', name: ''});

    const handleCreate = async () => {
        try {
            const teacherId = auth.currentUser.uid;
            const data = await CreateGroup(teacherId,groupName);

            setResult({code:data.code, name:groupName})
            setModalVisible(true);
            setGroupName('');
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
            <Button title='Create group' onPress={handleCreate}/>

            <Invite
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                inviteCode={result.code}
                groupName={result.name}
            />
        </View>
    )
}