import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

const STATUSES = ['Pending', 'In progress', 'Completed'];

const STATUS_COLORS: Record<string, string> = {
  Pending: Colors.warning,
  'In progress': Colors.primary,
  Completed: Colors.success,
};

const STATUS_BG: Record<string, string> = {
  Pending: Colors.warningLight,
  'In progress': Colors.primaryLight,
  Completed: Colors.successLight,
};

const PLACEHOLDER = [
  { id: '1', title: 'HR policy review', service: 'HR consulting', status: 'In progress' },
  { id: '2', title: 'Org restructuring advice', service: 'Business consulting', status: 'Pending' },
  { id: '3', title: 'Senior engineer search', service: 'Technical recruitment', status: 'Completed' },
];

export default function EngagementsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My engagements</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('RequestService', {})}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color={Colors.textInverse} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={PLACEHOLDER}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('EngagementDetail', { engagementId: item.id })}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={[styles.badge, { backgroundColor: STATUS_BG[item.status] }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status] }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.serviceLabel}>{item.service}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  newBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['3xl'] },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  serviceLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
});
