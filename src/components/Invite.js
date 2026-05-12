import { View, Text, Modal, Button } from 'react-native';
import { JoinGroup } from '../../services/groupService';
import React, { useState } from 'react';

export const handleJoin = async () => {
    try {
        const result = await JoinGroup(code);
        Alert.alert("Join successful", `Joined ${result.groupName}`)
    }
    catch (err) {
        Alert.alert("Error", err.message);
    }
}

export const Invite = ({ isVisible, onClose, inviteCode, groupName }) => {
    return (
        <Modal visible={isVisible} transparent={false}>
            <View>
                <Text>Name:{groupName}</Text>
                <Text>Invite Code: {inviteCode}</Text>

                <Button title='Close' onPress={onClose}/>
            </View>
        </Modal>
        
    )
    
}