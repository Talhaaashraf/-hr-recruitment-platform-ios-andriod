import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        {/* Logo placeholder — Phase 2 will use real asset */}
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>MJT</Text>
        </View>
        <Text style={styles.brand}>MJT Empowerment Enterprises</Text>
        <Text style={styles.tagline}>
          HR consulting, business advisory, and recruitment — all in one place.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Signup', { role: 'client' })}
        >
          <Text style={styles.primaryBtnText}>Continue as client</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Signup', { role: 'candidate' })}
        >
          <Text style={styles.secondaryBtnText}>Continue as candidate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginLinkAccent}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.base,
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoText: {
    color: Colors.textInverse,
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    letterSpacing: 1,
  },
  brand: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  tagline: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.size.base * 1.6,
    maxWidth: 280,
  },
  actions: {
    gap: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.textInverse,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
  },
  secondaryBtn: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  secondaryBtnText: {
    color: Colors.textPrimary,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
  },
  loginLink: {
    textAlign: 'center',
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  loginLinkAccent: {
    color: Colors.primary,
    fontWeight: Typography.weight.medium,
  },
});
