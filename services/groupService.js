import { collection, doc, setDoc, query, where, getDocs, runTransaction, arrayUnion, updateDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase"

export const CreateGroup = async (teacherId, groupName) => {
    const inviteCode = Math.random().toString(36).substring(2,8).toUpperCase();
    const groupRef = doc(collection(db, "groups"));

    await setDoc(groupRef, {
        name: groupName,
        teacherId,
        inviteCode,
        createdAt: new Date(),
        status: 'active',
        members: [teacherId]
    });

    return { inviteCode, groupId: groupRef.id };
} ;

export const JoinGroup = async (enteredCode) => {
    const rawCode = enteredCode;
    console.log(`raw code: ${rawCode}`);
    const studentId = auth.currentUser.uid;
    const q = query(collection(db, "groups"), where("inviteCode", "==", enteredCode.toUpperCase()));

    const querySnap = await getDocs(q);

    if (querySnap.empty) {
        throw new Error("Invalid code");
        const allDocs = await getDocs(groupRef);
        allDocs.forEach(doc => {
            console.log(`DB Snapshot codes: [${doc.data().inviteCode}]`);
        })
    }

    const groupDoc = querySnap.docs[0];
    const groupRef = doc(db, "groups", groupDoc.id);

    await updateDoc(groupRef, {
        members: arrayUnion(studentId)
    });

    return { groupName: groupDoc.data().name };
};