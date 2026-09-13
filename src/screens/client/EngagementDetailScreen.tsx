import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

const TIMELINE = [
  { label: 'Request submitted', done: true, date: 'Sep 1' },
  { label: 'Consultant assigned', done: true, date: 'Sep 2' },
  { label: 'In progress', done: true, date: 'Sep 5' },
  { label: 'Review', done: false, date: null },
  { label: 'Completed', done: false, date: null },
];

export default function EngagementDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary */}
        <View style={styles.card}>
          <Text style={styles.engTitle}>HR policy review</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>In progress</Text>
          </View>
          <Text style={styles.serviceLabel}>HR consulting</Text>
        </View>

        {/* Consultant */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned consultant</Text>
          <View style={styles.consultantRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View>
              <Text style={styles.consultantName}>Sarah Mokoena</Text>
              <Text style={styles.consultantRole}>Senior HR consultant</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status timeline</Text>
          {TIMELINE.map((step, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineDotCol}>
                <View style={[styles.dot, step.done && styles.dotDone]} />
                {i < TIMELINE.length - 1 && <View style={styles.line} />}
              </View>
              <View style={styles.timelineText}>
                <Text style={[styles.timelineLabel, !step.done && styles.timelineLabelMuted]}>
                  {step.label}
                </Text>
                {step.date && <Text style={styles.timelineDate}>{step.date}</Text>}
              </View>
            </View>
          ))}
        </View>
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  engTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.primary,
  },
  serviceLabel: { fontSize: Typography.size.sm, color: Colors.textMuted },
  section: { gap: Spacing.base },
  sectionTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  consultantRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.primary, fontWeight: Typography.weight.bold, fontSize: Typography.size.md },
  consultantName: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.textPrimary },
  consultantRole: { fontSize: Typography.size.sm, color: Colors.textMuted },
  timelineRow: { flexDirection: 'row', gap: Spacing.base },
  timelineDotCol: { alignItems: 'center', width: 16 },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderColor: Colors.borderStrong,
  },
  dotDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  line: { width: 2, flex: 1, backgroundColor: Colors.border, marginVertical: 2 },
  timelineText: { flex: 1, paddingBottom: Spacing.base },
  timelineLabel: { fontSize: Typography.size.base, color: Colors.textPrimary, fontWeight: Typography.weight.medium },
  timelineLabelMuted: { color: Colors.textMuted },
  timelineDate: { fontSize: Typography.size.xs, color: Colors.textMuted, marginTop: 2 },
});
