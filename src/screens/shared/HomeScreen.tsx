import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/tokens';
import { SERVICES } from '../../constants/services';
import { Service } from '../../types';

function ServiceCard({ service }: { service: Service }) {
  return (
    <TouchableOpacity style={styles.serviceCard} activeOpacity={0.8}>
      <View style={styles.serviceIconBox}>
        <Ionicons name={service.icon as any} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceDesc} numberOfLines={2}>
        {service.description}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { role, user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
            <Text style={styles.rolePill}>
              {role === 'client' ? 'Client account' : 'Candidate account'}
            </Text>
          </View>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons
            name="search-outline"
            size={18}
            color={Colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services…"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        {/* Stat card */}
        <View style={styles.statCard}>
          <Ionicons
            name={role === 'client' ? 'briefcase-outline' : 'file-tray-stacked-outline'}
            size={28}
            color={Colors.primary}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.statLabel}>
              {role === 'client' ? 'Active engagements' : 'Open positions'}
            </Text>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statHint}>Will update once connected to Supabase</Text>
          </View>
        </View>

        {/* Services grid */}
        <Text style={styles.sectionTitle}>Our services</Text>
        <View style={styles.grid}>
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_GAP = Spacing.sm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  rolePill: {
    fontSize: Typography.size.xs,
    color: Colors.primary,
    fontWeight: Typography.weight.medium,
    marginTop: 2,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: { marginRight: Spacing.sm },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.base,
  },
  statLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  statValue: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  statHint: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  serviceDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.size.sm * 1.5,
  },
});
