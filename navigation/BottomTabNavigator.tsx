import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Button, Overlay, ListItem, Avatar, Badge, withBadge } from 'react-native-elements';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import TimerScreen from '../screens/TimerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Text, View } from '../components/Themed';
import { BottomTabParamList, ConnectionsTabParamList, TimerTabParamList, ProfileTabParamList} from '../types';

const friends = [
  {
    name: 'Amy Farha',
    id: 2,
    subtitle: 'Since 09/19/2020',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: 'Chris Jackson',
    id: 3,
    subtitle: 'Since 09/20/2020',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },

]
// const Stack = createStackNavigator();
const FriendsStack = createStackNavigator();

function FriendsNavigator() {
  return (
    <FriendsStack.Navigator headerMode='screen'>
      <FriendsStack.Screen
        name="Friends"
        component={FriendsScreen}
        // options={{ headerTitle: 'Tab Two Title' }}
      />
    </FriendsStack.Navigator>
  );
}

function FriendsScreen() {
  return (
  <View>
    {
      friends.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{uri: l.avatar_url}} />
          {/* <Avatar source={{uri: l.avatar_url}} /> */}
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
    }
  </View>)
}


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function ConnectionsHeader( {navigation} ) {

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Button
        // onPress={() => navigation.navigate('FriendsList')}
        icon={{name: "navigate-before"}}
        buttonStyle={{ backgroundColor: '#F0FFFF', borderRadius:30}}
      />
      <Text style = {{fontSize: 26}}>Remaining Time: 0</Text>
      <Button
        icon={{name: "person-add" }}
        buttonStyle={{ backgroundColor: '#F0FFFF', borderRadius:30}}
      />
    </View>
  );
}

function TimerHeader() {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      {/* <Text
        // icon={{name: "more-vert"}}
        // buttonStyle={{ backgroundColor: '#FFFFFF', borderWidth: 10, borderRadius:30,}}
      /> */}
      <Text style={{fontSize: 26, marginLeft: 70}}>Pomodoro Timer</Text>
      <Button
        icon={{name: "more-vert" }}
        buttonStyle={{ backgroundColor: '#F0FFFF', borderRadius:30}}
      />
    </View>
  );
}

const BadgedIcon = withBadge(1)(TabBarIcon);

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  
  const [badgeCount, setBadged] = React.useState(0);

  function updateBadge() {
    setBadged(badgeCount+1);
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Timer"
      
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Connections"
        component={ConnectionsNavigator}
        options={{
          tabBarIcon: ({ color }) => (badgeCount > 0 ? <BadgedIcon name="chat" color={color} />
                                                      : <TabBarIcon name="chat" color={color} />)
        }}
      />
      <BottomTab.Screen
        name="Friends"
        component={FriendsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Timer"
        component={TimerNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="av-timer" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-pin" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ConnectionsTabStack = createStackNavigator<ConnectionsTabParamList>();

function ConnectionsNavigator() {
  return (
    <ConnectionsTabStack.Navigator headerMode='screen'>
      <ConnectionsTabStack.Screen
        name="Your Connections"
        component={ConnectionsScreen}
        options={{headerTitle: props => <ConnectionsHeader {...props} />}}
      />
    </ConnectionsTabStack.Navigator>
  );
}

const TimerTabStack = createStackNavigator<TimerTabParamList>();

function TimerNavigator() {
  return (
    <TimerTabStack.Navigator headerMode='screen'>
      <TimerTabStack.Screen
        name="Pomodoro Timer"
        component={TimerScreen}
        options={{headerTitle: props => <TimerHeader {...props} />}}
      />
    </TimerTabStack.Navigator>
  );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileNavigator() {
  return (
    <ProfileTabStack.Navigator headerMode='screen'>
      <ProfileTabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'My Profile' }}
      />
    </ProfileTabStack.Navigator>
  );
}

