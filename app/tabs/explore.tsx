import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/lib/colors';

interface CampusLocation {
  id: string;
  name: string;
  description: string;
  distance: string;
  icon: string;
}

const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: '1',
    name: 'Academic Block A',
    description: 'Main academic building with classrooms and labs',
    distance: '0.2 km',
    icon: '🏫',
  },
  {
    id: '2',
    name: 'Library',
    description: 'Central library with study areas',
    distance: '0.3 km',
    icon: '📚',
  },
  {
    id: '3',
    name: 'Cafeteria',
    description: 'Main food court and dining area',
    distance: '0.15 km',
    icon: '🍴',
  },
  {
    id: '4',
    name: 'Sports Complex',
    description: 'Indoor and outdoor sports facilities',
    distance: '0.4 km',
    icon: '⚽',
  },
  {
    id: '5',
    name: 'Hostel Block',
    description: 'Student accommodation area',
    distance: '0.5 km',
    icon: '🏠',
  },
  {
    id: '6',
    name: 'Health Center',
    description: 'Medical and wellness facilities',
    distance: '0.25 km',
    icon: '🏥',
  },
  {
    id: '7',
    name: 'Bus Stop',
    description: 'Main bus terminus for campus',
    distance: '0.1 km',
    icon: '🚌',
  },
  {
    id: '8',
    name: 'Parking Lot',
    description: 'Vehicle parking area',
    distance: '0.35 km',
    icon: '🅿️',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Campus Map</Text>
          <Text style={styles.subtitle}>Navigate around SRM Campus</Text>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ Campus Map</Text>
          <Text style={styles.mapSubText}>View detailed campus layout</Text>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.legendText}>Your Location</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.accent }]} />
            <Text style={styles.legendText}>Campus Locations</Text>
          </View>
        </View>

        {/* Locations List */}
        <View style={styles.locationsSection}>
          <Text style={styles.sectionTitle}>Nearby Locations</Text>
          {CAMPUS_LOCATIONS.map((location) => (
            <TouchableOpacity key={location.id} style={styles.locationCard}>
              <View style={styles.locationIcon}>
                <Text style={styles.iconText}>{location.icon}</Text>
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationDesc}>{location.description}</Text>
                <Text style={styles.locationDistance}>📍 {location.distance}</Text>
              </View>
              <TouchableOpacity style={styles.directionButton}>
                <Text style={styles.directionText}>📍</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Campus Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>📏 Total Area: 200+ acres</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>🏢 Multiple academic blocks</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>🚌 Regular shuttle services</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>⚡ Safe and secured campus</Text>
          </View>
        </View>
      </ScrollView>
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
  mapPlaceholder: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapSubText: {
    fontSize: 14,
    color: Colors['muted-foreground'],
  },
  legend: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: Colors.foreground,
  },
  locationsSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  locationDesc: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginTop: 2,
  },
  locationDistance: {
    fontSize: 10,
    color: Colors.primary,
    marginTop: 4,
  },
  directionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionText: {
    fontSize: 16,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.foreground,
  },
});
