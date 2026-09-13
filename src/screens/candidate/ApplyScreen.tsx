import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius } from '../../constants/tokens';

export default function ApplyScreen({ navigation }: any) {
  const [coverNote, setCoverNote] = useState('');
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handlePickResume() {
    // Phase 7: integrate expo-document-picker + Supabase Storage upload
    setResumeName('my_resume.pdf');
    Alert.alert('Resume selected', 'my_resume.pdf\n\n(File upload will be wired in Phase 7)');
  }

  function handleSubmit() {
    if (!resumeName) {
      Alert.alert('Resume required', 'Please upload your resume before submitting.');
      return;
    }
    setLoading(true);
    // Phase 7: insert application row in Supabase
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Application submitted!', "We'll review your application and be in touch.", [
        { text: 'View my applications', onPress: () => navigation.navigate('MyApplications') },
      ]);
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Apply for position</Text>
        <Text style={styles.jobRef}>Senior software engineer · TechCorp</Text>

        {/* Resume upload */}
        <View style={styles.section}>
          <Text style={styles.label}>Resume *</Text>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8} onPress={handlePickResume}>
            <Ionicons name={resumeName ? 'document-text-outline' : 'cloud-upload-outline'} size={28} color={Colors.primary} />
            <Text style={styles.uploadTitle}>{resumeName ?? 'Upload resume'}</Text>
            <Text style={styles.uploadHint}>PDF, DOCX — max 5 MB</Text>
          </TouchableOpacity>
        </View>

        {/* Cover note */}
        <View style={styles.section}>
          <Text style={styles.label}>Cover note (optional)</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Briefly introduce yourself and why you're interested…"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={coverNote}
            onChangeText={setCoverNote}
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color={Colors.textInverse} /> : <Text style={styles.primaryBtnText}>Submit application</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['3xl'], gap: Spacing.xl },
  title: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.textPrimary },
  jobRef: { fontSize: Typography.size.sm, color: Colors.textMuted, marginTop: -Spacing.md },
  section: { gap: Spacing.sm },
  label: { fontSize: Typography.size.sm, fontWeight: Typography.weight.medium, color: Colors.textPrimary },
  uploadBox: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    borderStyle: 'dashed', padding: Spacing.xl, alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  uploadTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.medium, color: Colors.textPrimary },
  uploadHint: { fontSize: Typography.size.xs, color: Colors.textMuted },
  textarea: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.border,
    borderRadius: Radius.md, paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md, fontSize: Typography.size.base,
    color: Colors.textPrimary, backgroundColor: Colors.surface, minHeight: 130,
  },
  primaryBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.base, alignItems: 'center' },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: Colors.textInverse, fontSize: Typography.size.base, fontWeight: Typography.weight.semibold },
});
