import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';
import { SERVICES } from '../../constants/services';
import { ServiceCategory } from '../../types';

export default function RequestServiceScreen() {
  const [selected, setSelected] = useState<ServiceCategory | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!selected || !description) {
      Alert.alert('Incomplete form', 'Please select a service and describe your need.');
      return;
    }
    setLoading(true);
    // Phase 7: submit to Supabase engagements table
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Request submitted', "We'll be in touch within 1 business day.");
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Request a service</Text>
        <Text style={styles.subtitle}>Tell us what you need and we'll connect you with the right consultant.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Service category</Text>
          <View style={styles.serviceList}>
            {SERVICES.map((svc) => (
              <TouchableOpacity
                key={svc.id}
                style={[styles.serviceOption, selected === svc.category && styles.serviceOptionActive]}
                activeOpacity={0.8}
                onPress={() => setSelected(svc.category)}
              >
                <Ionicons name={svc.icon as any} size={20} color={selected === svc.category ? Colors.primary : Colors.textMuted} />
                <Text style={[styles.serviceOptionText, selected === svc.category && styles.serviceOptionTextActive]}>
                  {svc.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Describe your need</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Give us as much context as possible…"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TouchableOpacity style={styles.uploadRow} activeOpacity={0.7}>
          <Ionicons name="attach-outline" size={20} color={Colors.primary} />
          <Text style={styles.uploadText}>Attach relevant documents (optional)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color={Colors.textInverse} /> : <Text style={styles.primaryBtnText}>Submit request</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['3xl'], gap: Spacing.xl },
  title: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Typography.size.base, color: Colors.textSecondary, lineHeight: Typography.size.base * 1.5 },
  section: { gap: Spacing.sm },
  label: { fontSize: Typography.size.sm, fontWeight: Typography.weight.medium, color: Colors.textPrimary },
  serviceList: { gap: Spacing.sm },
  serviceOption: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    padding: Spacing.base, borderRadius: Radius.md,
    backgroundColor: Colors.surface, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.border,
  },
  serviceOptionActive: { borderColor: Colors.primary, borderWidth: 1.5, backgroundColor: Colors.primaryLight },
  serviceOptionText: { fontSize: Typography.size.base, color: Colors.textSecondary },
  serviceOptionTextActive: { color: Colors.primary, fontWeight: Typography.weight.semibold },
  textarea: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.border,
    borderRadius: Radius.md, paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md, fontSize: Typography.size.base,
    color: Colors.textPrimary, backgroundColor: Colors.surface,
    minHeight: 120,
  },
  uploadRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  uploadText: { fontSize: Typography.size.base, color: Colors.primary, fontWeight: Typography.weight.medium },
  primaryBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.base, alignItems: 'center' },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: Colors.textInverse, fontSize: Typography.size.base, fontWeight: Typography.weight.semibold },
});
