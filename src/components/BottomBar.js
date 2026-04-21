import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';


import ProfileView from '../../views/ProfileView';
import HomeView from '../../views/HomeView';
import CreateGroupView from '../../views/CreateGroupView';
import JoinGroupView from '../../views/JoinGroupView';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user !== null) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      }
    setLoading(false);
    }
  }, []); 

  return (

    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeView}/>
      <Tab.Screen name='Profile' component={ProfileView}/>
        {role === 'teacher' && (
          <Tab.Screen name='Create' component={CreateGroupView}/>
        )}
        {role === 'student' && (
          <Tab.Screen name='Join' component={JoinGroupView}/>
        )}
    </Tab.Navigator>
  );
}