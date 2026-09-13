import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { Colors, Typography, Spacing } from '../constants/tokens';

// Screens & stacks
import HomeScreen from '../screens/shared/HomeScreen';
import ChatScreen from '../screens/shared/ChatScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import ClientStack from './ClientStack';
import CandidateStack from './CandidateStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.xs,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: Typography.size.xs,
          fontWeight: Typography.weight.medium,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, [string, string]> = {
            Home: ['home', 'home-outline'],
            JobsOrEngagements:
              role === 'client'
                ? ['briefcase', 'briefcase-outline']
                : ['layers', 'layers-outline'],
            Chat: ['chatbubbles', 'chatbubbles-outline'],
            Profile: ['person', 'person-outline'],
          };
          const [active, inactive] = icons[route.name] ?? ['help', 'help-outline'];
          return (
            <Ionicons
              name={(focused ? active : inactive) as any}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen
        name="JobsOrEngagements"
        component={role === 'client' ? ClientStack : CandidateStack}
        options={{
          title: role === 'client' ? 'Engagements' : 'Jobs',
        }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
