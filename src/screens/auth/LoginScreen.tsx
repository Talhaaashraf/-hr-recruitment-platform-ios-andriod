import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';
import { supabase } from '../../lib/supabase';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin() {
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
    // On success AuthContext listener will update session → AppNavigator switches to main tabs
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your MJT account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textInverse} />
          ) : (
            <Text style={styles.primaryBtnText}>Log in</Text>
          )}
          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Signup', {})}
        >
          <Text style={styles.signupLink}>
            Don't have an account?{' '}
            <Text style={styles.signupLinkAccent}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  header: { gap: Spacing.xs },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
  form: { gap: Spacing.base },
  field: { gap: Spacing.xs },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textPrimary,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
  },
  forgotLink: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    textAlign: 'right',
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: {
    color: Colors.textInverse,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
  },
  errorText: {
    color: 'red',
    marginTop: Spacing.xs,
    textAlign: 'center',
    fontSize: Typography.size.sm,
  },
  signupLink: {
    textAlign: 'center',
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  signupLinkAccent: {
    color: Colors.primary,
    fontWeight: Typography.weight.medium,
  },
});
