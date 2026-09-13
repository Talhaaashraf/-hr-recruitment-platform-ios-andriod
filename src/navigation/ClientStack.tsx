import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackParamList } from '../types';
import EngagementsScreen from '../screens/client/EngagementsScreen';
import EngagementDetailScreen from '../screens/client/EngagementDetailScreen';
import RequestServiceScreen from '../screens/client/RequestServiceScreen';
import { Colors, Typography } from '../constants/tokens';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export default function ClientStack() {
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
        name="Engagements"
        component={EngagementsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EngagementDetail"
        component={EngagementDetailScreen}
        options={{ title: 'Engagement detail' }}
      />
      <Stack.Screen
        name="RequestService"
        component={RequestServiceScreen}
        options={{ title: 'Request a service' }}
      />
    </Stack.Navigator>
  );
}
