import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/lib/colors';

interface BusRoute {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  stops: string[];
  fare: string;
  duration: string;
  frequency: string;
}

const BUS_ROUTES: BusRoute[] = [
  {
    id: '1',
    number: 'Express 1',
    name: 'Chennai Central - SRM Campus',
    from: 'Chennai Central',
    to: 'SRM Campus',
    stops: ['Chennai Central', 'Basin Bridge', 'Perambur', 'Avadi', 'Kattangulathur', 'SRM Campus'],
    fare: '₹45',
    duration: '1h 15m',
    frequency: 'Every 30 mins',
  },
  {
    id: '2',
    number: 'Express 2',
    name: 'Tambaram - SRM Campus',
    from: 'Tambaram',
    to: 'SRM Campus',
    stops: ['Tambaram', 'St Thomas Mount', 'Saidapet', 'Adyar', 'Teynampet', 'SRM Campus'],
    fare: '₹55',
    duration: '1h 30m',
    frequency: 'Every 45 mins',
  },
  {
    id: '3',
    number: 'Local 23',
    name: 'Velachery - SRM Campus',
    from: 'Velachery',
    to: 'SRM Campus',
    stops: ['Velachery', 'Pallavaram', 'Chromepet', 'Tambaram', 'SRM Campus'],
    fare: '₹35',
    duration: '1h',
    frequency: 'Every 20 mins',
  },
  {
    id: '4',
    number: 'Local 45',
    name: 'Kanchipuram - SRM Campus',
    from: 'Kanchipuram',
    to: 'SRM Campus',
    stops: ['Kanchipuram', 'Walajabad', 'Chengalpattu', 'Tambaram', 'SRM Campus'],
    fare: '₹65',
    duration: '2h',
    frequency: 'Every 60 mins',
  },
];

export default function BusesScreen() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleRoutePress = (route: BusRoute) => {
    setSelectedRoute(route);
    setShowDetails(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bus Routes</Text>
          <Text style={styles.subtitle}>Available bus services to campus</Text>
        </View>

        {/* Routes List */}
        <View style={styles.routesContainer}>
          <FlatList
            data={BUS_ROUTES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleRoutePress(item)}
                style={styles.routeCard}
              >
                <View style={styles.routeCardHeader}>
                  <View>
                    <Text style={styles.routeNumber}>{item.number}</Text>
                    <Text style={styles.routeName}>{item.name}</Text>
                  </View>
                  <View style={styles.routeCardInfo}>
                    <Text style={styles.fare}>{item.fare}</Text>
                    <Text style={styles.duration}>{item.duration}</Text>
                  </View>
                </View>

                <View style={styles.routeRoute}>
                  <Text style={styles.routeText}>{item.from}</Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.routeText}>{item.to}</Text>
                </View>

                <View style={styles.routeFooter}>
                  <Text style={styles.frequency}>🔄 {item.frequency}</Text>
                </View>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Details Modal */}
      <Modal visible={showDetails} transparent animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowDetails(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {selectedRoute && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailsHeader}>
                  <Text style={styles.detailsNumber}>{selectedRoute.number}</Text>
                  <Text style={styles.detailsName}>{selectedRoute.name}</Text>
                </View>

                <View style={styles.detailsInfoRow}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Fare</Text>
                    <Text style={styles.infoValue}>{selectedRoute.fare}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Duration</Text>
                    <Text style={styles.infoValue}>{selectedRoute.duration}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Frequency</Text>
                    <Text style={styles.infoValue}>{selectedRoute.frequency}</Text>
                  </View>
                </View>

                <View style={styles.stopsSection}>
                  <Text style={styles.stopsSectionTitle}>Bus Stops</Text>
                  {selectedRoute.stops.map((stop, index) => (
                    <View key={index} style={styles.stop}>
                      <View style={styles.stopDot} />
                      <Text style={styles.stopText}>{stop}</Text>
                      {index < selectedRoute.stops.length - 1 && (
                        <View style={styles.stopLine} />
                      )}
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Seat</Text>
                </TouchableOpacity>
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
  routesContainer: {
    paddingHorizontal: 16,
  },
  routeCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  routeNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  routeName: {
    fontSize: 12,
    color: Colors.foreground,
    marginTop: 2,
  },
  routeCardInfo: {
    alignItems: 'flex-end',
  },
  fare: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  duration: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginTop: 2,
  },
  routeRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
  },
  routeText: {
    fontSize: 12,
    color: Colors.foreground,
    flex: 1,
  },
  arrow: {
    color: Colors.primary,
    marginHorizontal: 8,
  },
  routeFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  frequency: {
    fontSize: 11,
    color: Colors['muted-foreground'],
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
  detailsHeader: {
    marginBottom: 20,
  },
  detailsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  detailsName: {
    fontSize: 16,
    color: Colors.foreground,
    marginTop: 4,
  },
  detailsInfoRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  stopsSection: {
    marginBottom: 20,
  },
  stopsSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  stop: {
    marginBottom: 12,
    position: 'relative',
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginBottom: 8,
  },
  stopText: {
    fontSize: 13,
    color: Colors.foreground,
    marginLeft: 16,
    marginTop: -20,
  },
  stopLine: {
    position: 'absolute',
    left: 5,
    top: 12,
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  bookButtonText: {
    color: Colors['primary-foreground'],
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});
