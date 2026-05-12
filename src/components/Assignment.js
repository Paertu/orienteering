import { Marker } from "react-native-maps";

export function AssignmentItem({  title, location }) {
    return (
        <View>
            <Text></Text>
        </View>
    );
}

export function AssignmentMarker( {assignment, showTooltip = true} ) {
    return (
        <Marker
            coordinate={assignment.coords}
            title={showTooltip ? assignment.title : undefined}
            tappable={showTooltip}
        />
    )
}
