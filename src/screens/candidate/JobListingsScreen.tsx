import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList,
  TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

type Filter = 'all' | 'technical' | 'non_technical';

const PLACEHOLDER_JOBS = [
  { id: '1', title: 'Senior software engineer', company: 'TechCorp', location: 'Remote', type: 'technical' },
  { id: '2', title: 'Data scientist', company: 'DataCo', location: 'Johannesburg', type: 'technical' },
  { id: '3', title: 'HR business partner', company: 'PeopleFirst', location: 'Cape Town', type: 'non_technical' },
  { id: '4', title: 'Marketing manager', company: 'BrandHouse', location: 'Durban', type: 'non_technical' },
];

export default function JobListingsScreen({ navigation }: any) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = PLACEHOLDER_JOBS.filter((j) => {
    const matchesFilter = filter === 'all' || j.type === filter;
    const matchesQuery = j.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Job listings</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search positions…"
          placeholderTextColor={Colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['all', 'technical', 'non_technical'] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
              {f === 'all' ? 'All' : f === 'technical' ? 'Technical' : 'Non-technical'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
          >
            <View style={styles.cardTop}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <View style={[styles.badge, { backgroundColor: item.type === 'technical' ? Colors.primaryLight : Colors.successLight }]}>
                <Text style={[styles.badgeText, { color: item.type === 'technical' ? Colors.primary : Colors.success }]}>
                  {item.type === 'technical' ? 'Technical' : 'Non-technical'}
                </Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="business-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{item.company}</Text>
              <Ionicons name="location-outline" size={14} color={Colors.textMuted} style={{ marginLeft: Spacing.sm }} />
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
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
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    marginHorizontal: Spacing.xl, backgroundColor: Colors.surface,
    borderRadius: Radius.md, borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border, paddingHorizontal: Spacing.md, marginBottom: Spacing.md,
  },
  searchInput: { flex: 1, paddingVertical: Spacing.md, fontSize: Typography.size.base, color: Colors.textPrimary },
  filterRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.xl, marginBottom: Spacing.base },
  filterChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: Radius.full, backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  filterChipText: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: Typography.weight.medium },
  filterChipTextActive: { color: Colors.primary, fontWeight: Typography.weight.semibold },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['3xl'] },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.base, borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border, gap: Spacing.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  jobTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.textPrimary, flex: 1, marginRight: Spacing.sm },
  badge: { borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  badgeText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: Typography.size.sm, color: Colors.textMuted },
});
