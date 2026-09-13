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
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, UserRole } from '../../types';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation, route }: Props) {
  const { setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    route.params?.role ?? 'candidate',
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignup() {
    setErrorMessage(null);
    if (!fullName || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: selectedRole },
      },
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    const userId = data?.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: userId, role: selectedRole, full_name: fullName });
      if (profileError) {
        setErrorMessage(profileError.message);
        return;
      }
    }
    setRole(selectedRole);
    Alert.alert(
      'Check your email',
      "We've sent you a confirmation link. Once confirmed, log in.",
      [{ text: 'Go to login', onPress: () => navigation.navigate('Login') }],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join MJT Empowerment Enterprises</Text>
          </View>

          {/* Role picker */}
          <View style={styles.roleSection}>
            <Text style={styles.label}>I am a…</Text>
            <View style={styles.rolePicker}>
              {(['client', 'candidate'] as UserRole[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.roleOption,
                    selectedRole === r && styles.roleOptionActive,
                  ]}
                  onPress={() => setSelectedRole(r)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.roleOptionText,
                      selectedRole === r && styles.roleOptionTextActive,
                    ]}
                  >
                    {r === 'client' ? 'Client / business' : 'Job candidate'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="Jane Smith"
                placeholderTextColor={Colors.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

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
                placeholder="Min. 6 characters"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
            activeOpacity={0.85}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textInverse} />
            ) : (
              <Text style={styles.primaryBtnText}>Create account</Text>
            )}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  inner: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
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
  roleSection: { gap: Spacing.sm },
  rolePicker: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  roleOption: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  roleOptionActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  roleOptionText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textSecondary,
  },
  roleOptionTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weight.semibold,
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
