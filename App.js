import { StyleSheet, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from './src/components/Map';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import CreateGroupView from './views/CreateGroupView';
import MainTabs from './src/components/BottomBar';
import JoinGroupView from './views/JoinGroupView';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',

    screens: {
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
        Main: {
        screen: MainTabs,
        options: {
          headerShown: false
        },
      },
    }
});

const NavigationStack = createStaticNavigation(RootStack);

export default function App() {    
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
