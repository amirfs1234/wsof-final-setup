import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/screens/LoginScreen';
import PyramidScreen from '@/screens/PyramidScreen';
import BlowOutScreen from '@/screens/BlowOutScreen';
import LeaderboardScreen from '@/screens/LeaderboardScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Pyramid" component={PyramidScreen} />
      <Stack.Screen name="BlowOut" component={BlowOutScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
}
