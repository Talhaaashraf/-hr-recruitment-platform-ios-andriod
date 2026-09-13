import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon as any} size={20} color={Colors.textMuted} style={styles.rowIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, role, signOut } = useAuth();
  const fullName = user?.user_metadata?.full_name ?? 'Unknown';
  const email = user?.email ?? '—';

  function handleSignOut() {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>{fullName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {role === 'client' ? 'Client' : 'Candidate'}
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.card}>
          <ProfileRow icon="mail-outline" label="Email" value={email} />
          <View style={styles.divider} />
          <ProfileRow
            icon="person-outline"
            label="Role"
            value={role === 'client' ? 'Client / business' : 'Job candidate'}
          />
        </View>

        {/* Actions */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <Ionicons name="create-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.actionText}>Edit profile</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <Ionicons name="lock-closed-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.actionText}>Change password</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  avatarSection: { alignItems: 'center', gap: Spacing.sm },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  name: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  roleBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  roleBadgeText: {
    color: Colors.primary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  rowIcon: { width: 24 },
  rowLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginLeft: Spacing.base,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  actionText: {
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.errorLight,
    borderRadius: Radius.md,
    paddingVertical: Spacing.base,
  },
  logoutText: {
    color: Colors.error,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
  },
});
