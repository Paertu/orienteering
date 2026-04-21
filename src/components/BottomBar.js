import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileView from '../../views/ProfileView';
import HomeView from '../../views/HomeView';
import CreateGroupView from '../../views/CreateGroupView';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeView}/>
      <Tab.Screen name='Profile' component={ProfileView}/>
      <Tab.Screen name='Create' component={CreateGroupView}/>
    </Tab.Navigator>
  );
}