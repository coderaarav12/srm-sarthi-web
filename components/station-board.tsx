import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StationBoardEntry } from '@/lib/train-types';
import { TrainCard } from './train-card';
import { Colors } from '@/lib/colors';

interface StationBoardProps {
  trains: StationBoardEntry[];
  title?: string;
  onTrainPress?: (train: StationBoardEntry) => void;
}

export function StationBoard({ trains, title = 'Station Board', onTrainPress }: StationBoardProps) {
  const sortedTrains = useMemo(() => {
    return [...trains].sort((a, b) => {
      const timeA = a.type === 'arrival' ? a.arrivalTime : a.departureTime;
      const timeB = b.type === 'arrival' ? b.arrivalTime : b.departureTime;
      return timeA.localeCompare(timeB);
    });
  }, [trains]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={sortedTrains}
        keyExtractor={(item) => `${item.trainNumber}-${item.type}`}
        renderItem={({ item }) => (
          <TrainCard train={item} onPress={() => onTrainPress?.(item)} />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 16,
  },
});
