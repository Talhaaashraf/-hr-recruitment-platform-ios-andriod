import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

type AppStatus = 'Applied' | 'Under review' | 'Interview' | 'Rejected' | 'Hired';

const STATUS_COLOR: Record<AppStatus, string> = {
  Applied: Colors.textMuted,
  'Under review': Colors.warning,
  Interview: Colors.primary,
  Rejected: Colors.error,
  Hired: Colors.success,
};

const STATUS_BG: Record<AppStatus, string> = {
  Applied: Colors.surface,
  'Under review': Colors.warningLight,
  Interview: Colors.primaryLight,
  Rejected: Colors.errorLight,
  Hired: Colors.successLight,
};

const PLACEHOLDER = [
  { id: '1', title: 'Senior software engineer', company: 'TechCorp', status: 'Interview' as AppStatus },
  { id: '2', title: 'Data scientist', company: 'DataCo', status: 'Under review' as AppStatus },
  { id: '3', title: 'HR business partner', company: 'PeopleFirst', status: 'Applied' as AppStatus },
];

export default function MyApplicationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My applications</Text>
      </View>
      <FlatList
        data={PLACEHOLDER}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.cardTop}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <View style={[styles.badge, { backgroundColor: STATUS_BG[item.status] }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.company}>{item.company}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  title: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.textPrimary },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['3xl'] },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.base, borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border, gap: Spacing.xs,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  jobTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.textPrimary, flex: 1, marginRight: Spacing.sm },
  badge: { borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  badgeText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  company: { fontSize: Typography.size.sm, color: Colors.textMuted },
});
