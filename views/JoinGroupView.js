import React, { useState} from 'react';
import { View, TextInput, Button, Alert, Modal } from 'react-native';
import { JoinGroup } from '../services/groupService';
import { auth } from '../services/firebase';
import { Invite } from '../src/components/Invite';
import { useNavigation } from '@react-navigation/native';

export default function JoinGroupView({navigation}) {
    const [inviteCode, setInviteCode] = useState('');

    const handleJoin = async () => {
        if (!inviteCode) {
            Alert.alert("Error","enter code")
            return;
        }
    
        try {
            console.log("Trying invite code", inviteCode);
            const result = await JoinGroup(inviteCode);

            Alert.alert("Success", "Joined group");
            navigation.navigate('Home');
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };
    return (
        <View>
            <TextInput
                placeholder='Invite Code'
                value={inviteCode}
                onChangeText={setInviteCode}
            />
            <Button title='Join Groip' onPress={handleJoin}/>
        </View>
    )
}