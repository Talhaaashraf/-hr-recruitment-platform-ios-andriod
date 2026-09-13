import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

const JOB = {
  title: 'Senior software engineer',
  company: 'TechCorp',
  location: 'Remote',
  type: 'technical',
  salary: 'R 65 000 – R 85 000 / month',
  description:
    'We are looking for an experienced software engineer to join our distributed team. You will work on high-impact products used by millions of users.',
  requirements: [
    '5+ years of software engineering experience',
    'Proficiency in TypeScript, React / React Native',
    'Experience with cloud platforms (AWS / GCP / Azure)',
    'Strong communication skills',
  ],
};

export default function JobDetailScreen({ navigation, route }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Text style={styles.jobTitle}>{JOB.title}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="business-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.metaText}>{JOB.company}</Text>
          <Ionicons name="location-outline" size={14} color={Colors.textMuted} style={{ marginLeft: Spacing.sm }} />
          <Text style={styles.metaText}>{JOB.location}</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Technical</Text>
        </View>
        <Text style={styles.salary}>{JOB.salary}</Text>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the role</Text>
          <Text style={styles.body}>{JOB.description}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {JOB.requirements.map((req, i) => (
            <View key={i} style={styles.reqRow}>
              <View style={styles.bullet} />
              <Text style={styles.reqText}>{req}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Apply CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Apply', { jobId: route.params?.jobId })}
        >
          <Text style={styles.applyBtnText}>Apply now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: 100, gap: Spacing.lg },
  jobTitle: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: Typography.size.sm, color: Colors.textMuted },
  pill: { alignSelf: 'flex-start', backgroundColor: Colors.primaryLight, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 3 },
  pillText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold, color: Colors.primary },
  salary: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.textPrimary },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.textPrimary },
  body: { fontSize: Typography.size.base, color: Colors.textSecondary, lineHeight: Typography.size.base * 1.6 },
  reqRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginTop: 7 },
  reqText: { flex: 1, fontSize: Typography.size.base, color: Colors.textSecondary, lineHeight: Typography.size.base * 1.5 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg,
    backgroundColor: Colors.background, borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  applyBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.base, alignItems: 'center' },
  applyBtnText: { color: Colors.textInverse, fontSize: Typography.size.base, fontWeight: Typography.weight.semibold },
});
