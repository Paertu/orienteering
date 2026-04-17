import { StyleSheet, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from './src/components/Map';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';

const RootStack = createNativeStackNavigator({
      screens: {
          Home: {
              screen: HomeView,
              options: {title: 'Home'},
          },
          Signup: {
            screen: SignupView
          },
          Login: {
            screen: LoginView
          }
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
