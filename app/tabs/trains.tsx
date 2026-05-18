import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_STATION_BOARD, MOCK_TRAINS } from '@/lib/srm-data';
import { StationBoard } from '@/components/station-board';
import { TrainCard } from '@/components/train-card';
import { Colors } from '@/lib/colors';
import { formatTime, DEFAULT_FROM, DEFAULT_TO } from '@/lib/utils';
import { TrainInfo, TrainStop } from '@/lib/train-types';

export default function TrainsScreen() {
  const [activeTab, setActiveTab] = useState<'station' | 'search' | 'track'>('station');
  const [searchFrom, setSearchFrom] = useState(DEFAULT_FROM);
  const [searchTo, setSearchTo] = useState(DEFAULT_TO);
  const [trackNumber, setTrackNumber] = useState('');
  const [selectedTrain, setSelectedTrain] = useState<TrainInfo | null>(null);
  const [showTrainDetails, setShowTrainDetails] = useState(false);

  const stationBoard = useMemo(() => {
    return MOCK_STATION_BOARD.filter((train) => {
      const fromMatch = train.source.toLowerCase().includes(searchFrom.toLowerCase());
      const toMatch = train.destination.toLowerCase().includes(searchTo.toLowerCase());
      return fromMatch && toMatch;
    });
  }, [searchFrom, searchTo]);

  const searchResults = useMemo(() => {
    if (!searchFrom || !searchTo) return [];
    return MOCK_TRAINS.filter(
      (train) =>
        (train.source.code === searchFrom || train.source.name.toLowerCase().includes(searchFrom.toLowerCase())) &&
        (train.destination.code === searchTo || train.destination.name.toLowerCase().includes(searchTo.toLowerCase()))
    );
  }, [searchFrom, searchTo]);

  const trackedTrain = useMemo(() => {
    if (!trackNumber) return null;
    return MOCK_TRAINS.find((t) => t.trainNumber === trackNumber);
  }, [trackNumber]);

  const handleTrainSelect = (train: TrainInfo) => {
    setSelectedTrain(train);
    setShowTrainDetails(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Train Schedule</Text>
          <Text style={styles.subtitle}>Potheri Station</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['station', 'search', 'track'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab === 'station' ? 'Station' : tab === 'search' ? 'Search' : 'Track'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Station Tab */}
        {activeTab === 'station' && (
          <View>
            <StationBoard
              trains={stationBoard}
              title="Live Board"
              onTrainPress={(train) => console.log('Train selected:', train)}
            />
          </View>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Trains</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="From (code or station)"
                placeholderTextColor={Colors['muted-foreground']}
                value={searchFrom}
                onChangeText={setSearchFrom}
              />
              <TextInput
                style={styles.input}
                placeholder="To (code or station)"
                placeholderTextColor={Colors['muted-foreground']}
                value={searchTo}
                onChangeText={setSearchTo}
              />
            </View>

            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.trainNumber}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleTrainSelect(item)}
                    style={styles.trainResultCard}
                  >
                    <View style={styles.trainResultHeader}>
                      <Text style={styles.trainResultNumber}>{item.trainNumber}</Text>
                      <Text style={styles.trainResultName}>{item.trainName}</Text>
                    </View>
                    <View style={styles.trainResultTimes}>
                      <Text style={styles.trainResultTime}>{formatTime(item.source.departureTime)}</Text>
                      <Text style={styles.trainResultDuration}>{item.duration}</Text>
                      <Text style={styles.trainResultTime}>{formatTime(item.destination.arrivalTime)}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.emptyText}>No trains found</Text>
            )}
          </View>
        )}

        {/* Track Tab */}
        {activeTab === 'track' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Track Train</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter train number"
              placeholderTextColor={Colors['muted-foreground']}
              value={trackNumber}
              onChangeText={setTrackNumber}
            />

            {trackedTrain && (
              <View style={styles.trainDetailsCard}>
                <Text style={styles.trainDetailsNumber}>{trackedTrain.trainNumber}</Text>
                <Text style={styles.trainDetailsName}>{trackedTrain.trainName}</Text>
                <View style={styles.trainDetailsRoute}>
                  <Text style={styles.trainDetailsStation}>{trackedTrain.source.name}</Text>
                  <Text style={styles.trainDetailsArrow}>→</Text>
                  <Text style={styles.trainDetailsStation}>{trackedTrain.destination.name}</Text>
                </View>
                <Text style={styles.trainDetailsInfo}>Distance: {trackedTrain.distance} km</Text>
                <Text style={styles.trainDetailsInfo}>Duration: {trackedTrain.duration}</Text>
                <TouchableOpacity onPress={() => handleTrainSelect(trackedTrain)} style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Full Route</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Train Details Modal */}
      <Modal visible={showTrainDetails} transparent animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowTrainDetails(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {selectedTrain && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTrainNumber}>{selectedTrain.trainNumber}</Text>
                  <Text style={styles.modalTrainName}>{selectedTrain.trainName}</Text>
                </View>

                <View style={styles.modalRouteSection}>
                  <Text style={styles.modalSectionTitle}>Route</Text>
                  {selectedTrain.route.map((stop, index) => (
                    <View key={index} style={styles.routeStop}>
                      <View style={styles.stopDot} />
                      <View style={styles.stopInfo}>
                        <Text style={styles.stopName}>{stop.stationName}</Text>
                        <View style={styles.stopTimes}>
                          <Text style={styles.stopTime}>
                            Arr: {stop.arrivalTime}
                          </Text>
                          <Text style={styles.stopTime}>
                            Dep: {stop.departureTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: 14,
    color: Colors['muted-foreground'],
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors['muted-foreground'],
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.primary,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  searchContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.input,
    color: Colors.foreground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    fontSize: 14,
  },
  trainResultCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  trainResultHeader: {
    marginBottom: 8,
  },
  trainResultNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  trainResultName: {
    fontSize: 13,
    color: Colors.foreground,
    marginTop: 2,
  },
  trainResultTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainResultTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  trainResultDuration: {
    fontSize: 11,
    color: Colors['muted-foreground'],
  },
  emptyText: {
    fontSize: 14,
    color: Colors['muted-foreground'],
    textAlign: 'center',
    paddingVertical: 20,
  },
  trainDetailsCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  trainDetailsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  trainDetailsName: {
    fontSize: 14,
    color: Colors.foreground,
    marginTop: 4,
  },
  trainDetailsRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  trainDetailsStation: {
    fontSize: 12,
    color: Colors.foreground,
    fontWeight: '600',
  },
  trainDetailsArrow: {
    marginHorizontal: 8,
    color: Colors.primary,
  },
  trainDetailsInfo: {
    fontSize: 12,
    color: Colors['muted-foreground'],
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 12,
  },
  detailsButtonText: {
    color: Colors['primary-foreground'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.foreground,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTrainNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalTrainName: {
    fontSize: 16,
    color: Colors.foreground,
    marginTop: 4,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  modalRouteSection: {
    marginBottom: 20,
  },
  routeStop: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginRight: 12,
    marginTop: 2,
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.foreground,
  },
  stopTimes: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  stopTime: {
    fontSize: 11,
    color: Colors['muted-foreground'],
  },
});
