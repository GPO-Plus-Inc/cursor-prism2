import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { OfflineProvider, useSyncQueue } from '@fsm/mobile-offline';
import {
  appMeta,
  designTokens,
  heroMetrics,
  mobileTechHighlights,
} from '@fsm/shared';

const toneColorMap = {
  accent: designTokens.colors.accent,
  teal: designTokens.colors.teal,
  aqua: designTokens.colors.aqua,
  neutral: designTokens.colors.neutral,
} as const;

const SyncStatusBar = () => {
  const { pendingCount } = useSyncQueue();

  return (
    <View style={styles.syncBar}>
      <Text style={styles.syncLabel}>Sync queue</Text>
      <Text style={styles.syncValue}>{pendingCount}</Text>
    </View>
  );
};

export const App = () => {
  return (
    <OfflineProvider platform={Platform.OS === 'web' ? 'web' : 'native'}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Field Ops / {appMeta.productName}</Text>
            <Text style={styles.heroTitle}>Technician dashboard</Text>
            <Text style={styles.heroBody}>
              Offline-first checklist workflow, planogram guidance, barcode
              scanning, and GPS breadcrumbs all wired to sync queues.
            </Text>
            <View style={styles.heroBadges}>
              <Text style={[styles.pill, styles.pillAccent]}>
                Offline sync ready
              </Text>
              <Text style={[styles.pill, styles.pillGhost]}>
                3 jobs queued
              </Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            {heroMetrics.map((metric) => (
              <View key={metric.label} style={styles.metricCard}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricHelper}>{metric.helper}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Today's focus</Text>
          <View style={styles.cardStack}>
            {mobileTechHighlights.map((card) => (
              <View
                key={card.key}
                style={[
                  styles.moduleCard,
                  { borderColor: toneColorMap[card.tone] },
                ]}
              >
                <Text
                  style={[
                    styles.cardBadge,
                    { color: toneColorMap[card.tone] },
                  ]}
                >
                  {card.badge}
                </Text>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardBody}>{card.body}</Text>
              </View>
            ))}
          </View>
          <SyncStatusBar />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: designTokens.colors.backdrop,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    gap: 18,
  },
  hero: {
    backgroundColor: designTokens.colors.ink,
    padding: 24,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroBody: {
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
    fontSize: 14,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pillAccent: {
    backgroundColor: designTokens.colors.accent,
    color: '#fff',
  },
  pillGhost: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    color: 'rgba(255,255,255,0.9)',
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: designTokens.colors.surface,
    borderRadius: 20,
    padding: 16,
    shadowColor: 'rgba(5,7,11,0.15)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '600',
    color: designTokens.colors.ink,
  },
  metricLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1.5,
    color: designTokens.colors.neutral,
    marginTop: 6,
  },
  metricHelper: {
    marginTop: 4,
    color: 'rgba(5,7,11,0.7)',
  },
  sectionLabel: {
    textTransform: 'uppercase',
    fontSize: 13,
    letterSpacing: 2,
    color: designTokens.colors.neutral,
    marginTop: 8,
  },
  cardStack: {
    gap: 14,
  },
  moduleCard: {
    backgroundColor: designTokens.colors.surface,
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 20,
    shadowColor: 'rgba(5,7,11,0.08)',
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  cardBadge: {
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1.4,
    marginBottom: 8,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: designTokens.colors.ink,
    marginBottom: 6,
  },
  cardBody: {
    color: designTokens.colors.neutral,
    lineHeight: 20,
  },
  syncBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: designTokens.colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: designTokens.colors.borderLight,
  },
  syncLabel: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 11,
    color: designTokens.colors.neutral,
  },
  syncValue: {
    fontSize: 20,
    fontWeight: '600',
    color: designTokens.colors.ink,
  },
});

export default App;
