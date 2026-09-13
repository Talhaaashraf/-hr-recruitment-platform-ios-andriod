import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { Colors } from '../constants/tokens';

const Root = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {session ? (
        <Root.Screen name="Main" component={MainTabs} />
      ) : (
        <Root.Screen name="Auth" component={AuthStack} />
      )}
    </Root.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
