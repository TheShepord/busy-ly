import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lucas Shepard</Text>
      <Avatar size='xlarge' source={{uri: 'https://avatars0.githubusercontent.com/u/53844396?s=400&u=24f03f6c81ad5638b88beaf345f73d18f2a84798&v=4'}} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{width:250}}>"I'm passionate about Computer Science, Robotics, and dogs. Let's chat!"</Text>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
