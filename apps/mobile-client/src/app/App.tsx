import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  appMeta,
  clientPortalHighlights,
  designTokens,
} from '@fsm/shared';

const toneColorMap = {
  accent: designTokens.colors.accent,
  teal: designTokens.colors.teal,
  aqua: designTokens.colors.aqua,
  neutral: designTokens.colors.neutral,
} as const;

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Client Portal</Text>
            <Text style={styles.heroTitle}>{appMeta.productName}</Text>
            <Text style={styles.heroBody}>
              Track upcoming visits, download service reports, and keep invoice
              status synchronized even while offline.
            </Text>
            <View style={styles.statusRow}>
              <Text style={[styles.pill, styles.pillAccent]}>2 open invoices</Text>
              <Text style={[styles.pill, styles.pillGhost]}>Offline cache on</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Highlights</Text>
          <View style={styles.cardStack}>
            {clientPortalHighlights.map((card) => (
              <View
                key={card.key}
                style={[
                  styles.portalCard,
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

          <View style={styles.locationCard}>
            <Text style={styles.locationLabel}>Service location</Text>
            <Text style={styles.locationName}>Harborview Market · SF</Text>
            <Text style={styles.locationMeta}>Next visit · Wed 09:00 AM</Text>
            <Text style={styles.locationMeta}>Assigned crew · DSD Team 3</Text>
          </View>
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
    paddingBottom: 40,
    gap: 20,
  },
  hero: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: designTokens.colors.borderLight,
    shadowColor: 'rgba(5,7,11,0.08)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    color: designTokens.colors.neutral,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: designTokens.colors.ink,
    marginBottom: 8,
  },
  heroBody: {
    color: designTokens.colors.neutral,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    flexWrap: 'wrap',
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  pillAccent: {
    backgroundColor: designTokens.colors.accent,
    color: '#fff',
  },
  pillGhost: {
    borderWidth: 1,
    borderColor: designTokens.colors.borderStrong,
    color: designTokens.colors.neutral,
  },
  sectionLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 2,
    color: designTokens.colors.neutral,
  },
  cardStack: {
    gap: 14,
  },
  portalCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    shadowColor: 'rgba(5,7,11,0.08)',
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  cardBadge: {
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: designTokens.colors.ink,
    marginBottom: 4,
  },
  cardBody: {
    color: designTokens.colors.neutral,
    lineHeight: 20,
  },
  locationCard: {
    backgroundColor: designTokens.colors.ink,
    borderRadius: 24,
    padding: 24,
  },
  locationLabel: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  locationName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginTop: 6,
  },
  locationMeta: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
});

export default App;
