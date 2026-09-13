import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CandidateStackParamList } from '../types';
import JobListingsScreen from '../screens/candidate/JobListingsScreen';
import JobDetailScreen from '../screens/candidate/JobDetailScreen';
import ApplyScreen from '../screens/candidate/ApplyScreen';
import MyApplicationsScreen from '../screens/candidate/MyApplicationsScreen';
import { Colors, Typography } from '../constants/tokens';

const Stack = createNativeStackNavigator<CandidateStackParamList>();

export default function CandidateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: Typography.weight.semibold,
          color: Colors.textPrimary,
        },
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="JobListings"
        component={JobListingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{ title: 'Job details' }}
      />
      <Stack.Screen
        name="Apply"
        component={ApplyScreen}
        options={{ title: 'Apply' }}
      />
      <Stack.Screen
        name="MyApplications"
        component={MyApplicationsScreen}
        options={{ title: 'My applications' }}
      />
    </Stack.Navigator>
  );
}
