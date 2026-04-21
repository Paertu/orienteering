import { Text, View, Button } from 'react-native';

export default function GroupView({ route }) {
    const { groupData } = route.params;

    return (
        <View>
            <Text>
                {groupData.name}
            </Text>

            <Text>
                {groupData.id}
            </Text>

                {groupData.members.map((member) => (
                    <Text key={member}>
                        {member}
                    </Text>
                ))}
        </View>
    )
}