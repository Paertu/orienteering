import { StyleSheet, View } from 'react-native';
import Map from './src/components/Map';
import SignupView from './views/SignupView';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Map/> */}
      <SignupView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
