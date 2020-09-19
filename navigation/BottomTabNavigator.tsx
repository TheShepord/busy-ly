import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import TimerScreen from '../screens/TimerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList, ConnectionsTabParamList, TimerTabParamList, ProfileTabParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Timer"
      
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Connections"
        component={ConnectionsNavigator}
        headerMode='none'
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="chat" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Timer"
        component={TimerNavigator}
        headerMode='none'
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="av-timer" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        headerMode='none'
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
    <ConnectionsTabStack.Navigator headerMode='none'>
      <ConnectionsTabStack.Screen
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        // options={{ headerTitle: 'Tab One Title' }}
      />
    </ConnectionsTabStack.Navigator>
  );
}

const TimerTabStack = createStackNavigator<TimerTabParamList>();

function TimerNavigator() {
  return (
    <TimerTabStack.Navigator headerMode='none'>
      <TimerTabStack.Screen
        name="TimerScreen"
        component={TimerScreen}
        // options={{ headerTitle: 'Tab Two Title' }}
      />
    </TimerTabStack.Navigator>
  );
}


const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileNavigator() {
  return (
    <ProfileTabStack.Navigator headerMode='none'>
      <ProfileTabStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        // options={{ headerTitle: 'Tab Two Title' }}
      />
    </ProfileTabStack.Navigator>
  );
}