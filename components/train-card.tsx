import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StationBoardEntry } from '@/lib/train-types';
import { formatTime } from '@/lib/utils';
import { Colors } from '@/lib/colors';

interface TrainCardProps {
  train: StationBoardEntry;
  onPress?: () => void;
}

export function TrainCard({ train, onPress }: TrainCardProps) {
  const isArrival = train.type === 'arrival';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.trainNumber}>{train.trainNumber}</Text>
          <View style={[styles.badge, { backgroundColor: isArrival ? '#1f6b4e' : '#1e3a5f' }]}>
            <Text style={styles.badgeText}>{isArrival ? 'Arrival' : 'Departure'}</Text>
          </View>
        </View>

        <Text style={styles.trainName} numberOfLines={1}>{train.trainName}</Text>

        <View style={styles.timeSection}>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.time}>{formatTime(isArrival ? train.departureTime : train.arrivalTime)}</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
          <View>
            <Text style={styles.label}>To</Text>
            <Text style={styles.time}>{formatTime(isArrival ? train.arrivalTime : train.departureTime)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Platform</Text>
            <Text style={styles.footerValue}>{train.platform}</Text>
          </View>
          {train.delay !== 0 && (
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Delay</Text>
              <Text style={[styles.footerValue, { color: train.delay > 0 ? Colors.accent : Colors.success }]}>
                {train.delay > 0 ? `+${train.delay}m` : `${train.delay}m`}
              </Text>
            </View>
          )}
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Distance</Text>
            <Text style={styles.footerValue}>{train.distance} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trainNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.foreground,
  },
  trainName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.foreground,
    marginBottom: 12,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  arrow: {
    marginHorizontal: 8,
  },
  arrowText: {
    fontSize: 20,
    color: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 10,
    color: Colors['muted-foreground'],
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  footerValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
});
