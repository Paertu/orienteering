import { useEffect, useState } from "react";
import { useLocation } from "../src/hooks/useLocation";
import { collection, doc, onSnapshot, getDoc, addDoc, query, where } from "firebase/firestore";
import { AssignmentMarker } from "../src/components/Assignment";
import { View, Text, Alert } from "react-native";
import Map from "../src/components/Map";
import { db } from "../services/firebase";
import { Circle } from 'react-native-maps';
import React from "react";

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function StudentView({route}) {
    const { groupData } = route.params;
    const { location } = useLocation();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "assignments"), where("groupId", "==", groupData.id));
        return onSnapshot(q,(snap) => {
            console.log("check snap docs:", snap.docs.length);

            const fetchedAssignments = (snap.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            })));
            setAssignments(fetchedAssignments);
        });
    }, []);

    useEffect(() => {
        if (!location || assignments.length === 0) return;

        assignments.forEach(task => {
            const dist = getDistance(
                location.latitude, location.longitude,
                task.coords.latitude, task.coords.longitude
            );

            if (dist < 50) {
                Alert.alert("u made it", `${task.title}`);
            }
        });
    }, [location, assignments]);

    return (
        <View style={{height:400}}>
            <Map>
                {assignments.map(item => {
                    if (!item.coords) {
                        return null;
                    }
                    return (
                        <React.Fragment key={item.id}>
                            <AssignmentMarker assignment={item}/>
                            <Circle
                                center={item.coords}
                                radius={50}
                                strokeColor="rgba(255, 0, 0, 0.5)"
                                fillColor="rgba(255, 0, 0, 0.2)"
                            />
                        </React.Fragment>
                    );
                })}
            </Map>
        </View>
    )
}