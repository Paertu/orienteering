import { Marker } from "react-native-maps";

export function AssignmentItem({  title, location }) {
    return (
        <View>
            <Text></Text>
        </View>
    );
}

export function AssignmentMarker({ assignment }) {
    return (
        <Marker
            coordinate={assignment.coords}
            title={assignment.title}
        />
    )
}