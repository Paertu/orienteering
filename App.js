import { StyleSheet, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './services/firebase';

import Map from './src/components/Map';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import CreateGroupView from './views/CreateGroupView';
import MainTabs from './src/components/BottomBar';
import JoinGroupView from './views/JoinGroupView';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',

    screens: {
      Main: {
        screen: MainTabs,
          options: {
            headerShown: false
          },
      },
        Home: {
          screen: HomeView
        },
        Signup: {
          screen: SignupView
        },
        Login: {
          screen: LoginView
        },
        Profile: {
          screen: ProfileView
        },
        JoinGroup: {
          screen: JoinGroupView
        },
        CreateGroup: {
          screen: CreateGroupView
        },
      },
    }
);

const NavigationStack = createStaticNavigation(RootStack);

export default function App() {    
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, 
  []);

  return (
    <View style={styles.container}>
      <NavigationStack/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
