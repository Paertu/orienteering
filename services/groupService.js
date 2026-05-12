import { collection, doc, setDoc, query, where, getDocs, runTransaction, arrayUnion, updateDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase"

export const CreateGroup = async (teacherId, groupName) => {
    // INVITE CODE GENERATION
    const inviteCode = Math.random().toString(36).substring(2,8).toUpperCase();
    const groupRef = doc(collection(db, "groups"));

    // CREATE GROUP
    await setDoc(groupRef, {
        name: groupName,
        teacherId,
        inviteCode,
        createdAt: new Date(),
        status: 'active',
        members: [teacherId],
        admin: [teacherId]
    });

    return { inviteCode, groupId: groupRef.id };
} ;

export const JoinGroup = async (enteredCode) => {
    const studentId = auth.currentUser.uid;

    // find group
    const q = query(collection(db, "groups"), where("inviteCode", "==", enteredCode.toUpperCase()));
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
        throw new Error("Invalid code");
        const allDocs = await getDocs(groupRef);
        allDocs.forEach(doc => {
            console.log(`DB Snapshot codes: [${doc.data().inviteCode}]`);
        })
    }

    // add student to group
    const groupDoc = querySnap.docs[0];
    const groupRef = doc(db, "groups", groupDoc.id);
    await updateDoc(groupRef, {
        members: arrayUnion(studentId)
    });

    return { groupName: groupDoc.data().name };
};