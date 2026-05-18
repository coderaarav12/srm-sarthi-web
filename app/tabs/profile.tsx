import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ACADEMIC_YEARS, SRM_BRANCHES } from '@/lib/srm-data';
import { Colors } from '@/lib/colors';

interface UserProfile {
  name: string;
  year: string;
  branch: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    year: '',
    branch: '',
  });
  const [showOnboarding, setShowOnboarding] = useState(!profile.name);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showBranchPicker, setShowBranchPicker] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  useEffect(() => {
    // Load profile from AsyncStorage in real app
    // For now, using in-memory state
  }, []);

  const handleSaveProfile = () => {
    if (tempName.trim()) {
      const newProfile = {
        name: tempName,
        year: profile.year,
        branch: profile.branch,
      };
      setProfile(newProfile);
      // Save to AsyncStorage in real app
      setShowOnboarding(false);
    }
  };

  const handleYearSelect = (year: string) => {
    setProfile({ ...profile, year });
    setShowYearPicker(false);
  };

  const handleBranchSelect = (branch: string) => {
    setProfile({ ...profile, branch });
    setShowBranchPicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showOnboarding ? (
        // Onboarding Modal
        <View style={styles.onboardingContainer}>
          <ScrollView contentContainerStyle={styles.onboardingContent}>
            <View style={styles.onboardingHeader}>
              <Text style={styles.onboardingTitle}>Welcome to SRM Sarthi</Text>
              <Text style={styles.onboardingSubtitle}>
                Let&apos;s set up your profile to personalize your commute experience
              </Text>
            </View>

            <View style={styles.onboardingForm}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors['muted-foreground']}
                  value={tempName}
                  onChangeText={setTempName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Academic Year</Text>
                <TouchableOpacity
                  onPress={() => setShowYearPicker(true)}
                  style={styles.picker}
                >
                  <Text style={[styles.pickerText, !profile.year && styles.placeholderText]}>
                    {profile.year || 'Select year'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Branch / Program</Text>
                <TouchableOpacity
                  onPress={() => setShowBranchPicker(true)}
                  style={styles.picker}
                >
                  <Text
                    style={[styles.pickerText, !profile.branch && styles.placeholderText]}
                    numberOfLines={1}
                  >
                    {profile.branch || 'Select branch'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSaveProfile}
                disabled={!tempName.trim() || !profile.year || !profile.branch}
                style={[styles.saveButton, (!tempName.trim() || !profile.year || !profile.branch) && styles.disabledButton]}
              >
                <Text style={styles.saveButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        // Profile View
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileBranch}>{profile.branch}</Text>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Academic Year</Text>
              <Text style={styles.detailValue}>{profile.year}</Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Branch</Text>
              <Text style={styles.detailValue}>{profile.branch}</Text>
            </View>
          </View>

          {/* Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>🔔 Notifications</Text>
                <Text style={styles.settingDesc}>Enable push notifications</Text>
              </View>
              <Text style={styles.settingToggle}>ON</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>🌙 Dark Mode</Text>
                <Text style={styles.settingDesc}>Currently enabled</Text>
              </View>
              <Text style={styles.settingToggle}>ON</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>📍 Location Services</Text>
                <Text style={styles.settingDesc}>For better route planning</Text>
              </View>
              <Text style={styles.settingToggle}>OFF</Text>
            </TouchableOpacity>
          </View>

          {/* Preferences */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.preferenceCard}>
              <Text style={styles.preferenceLabel}>🚂 Preferred Transport</Text>
              <Text style={styles.preferenceValue}>Local Train</Text>
            </View>

            <View style={styles.preferenceCard}>
              <Text style={styles.preferenceLabel}>⏰ Peak Hours</Text>
              <Text style={styles.preferenceValue}>7:30 AM - 9:30 AM</Text>
            </View>

            <View style={styles.preferenceCard}>
              <Text style={styles.preferenceLabel}>🎟️ Pass Type</Text>
              <Text style={styles.preferenceValue}>Monthly Pass</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            onPress={() => setShowOnboarding(true)}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About SRM Sarthi</Text>
            <Text style={styles.aboutText}>
              SRM Sarthi is your daily commute companion, providing real-time train schedules, bus tracking,
              and campus navigation for SRMIST students.
            </Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      )}

      {/* Year Picker Modal */}
      <Modal visible={showYearPicker} transparent animationType="fade">
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerModal}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Year</Text>
              <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={ACADEMIC_YEARS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleYearSelect(item)}
                  style={styles.pickerOption}
                >
                  <Text style={styles.pickerOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Branch Picker Modal */}
      <Modal visible={showBranchPicker} transparent animationType="fade">
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerModal}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Branch</Text>
              <TouchableOpacity onPress={() => setShowBranchPicker(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={SRM_BRANCHES}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleBranchSelect(item)}
                  style={styles.pickerOption}
                >
                  <Text style={styles.pickerOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  onboardingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  onboardingContent: {
    padding: 20,
    paddingTop: 40,
  },
  onboardingHeader: {
    marginBottom: 32,
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 8,
  },
  onboardingSubtitle: {
    fontSize: 14,
    color: Colors['muted-foreground'],
  },
  onboardingForm: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.foreground,
  },
  input: {
    backgroundColor: Colors.input,
    color: Colors.foreground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  picker: {
    backgroundColor: Colors.input,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 14,
    color: Colors.foreground,
  },
  placeholderText: {
    color: Colors['muted-foreground'],
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: Colors['primary-foreground'],
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors['primary-foreground'],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  profileBranch: {
    fontSize: 12,
    color: Colors['muted-foreground'],
    marginTop: 2,
  },
  detailsSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
    gap: 10,
  },
  detailCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 14,
  },
  detailLabel: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.foreground,
  },
  settingDesc: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    marginTop: 2,
  },
  settingToggle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  preferencesSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  preferenceCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  preferenceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.foreground,
  },
  preferenceValue: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  editButton: {
    marginHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 12,
  },
  editButtonText: {
    color: Colors['primary-foreground'],
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  aboutSection: {
    paddingHorizontal: 16,
    marginTop: 12,
    paddingBottom: 20,
  },
  aboutTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 12,
    color: Colors['muted-foreground'],
    lineHeight: 18,
    marginBottom: 12,
  },
  version: {
    fontSize: 11,
    color: Colors['muted-foreground'],
    textAlign: 'center',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  closeText: {
    fontSize: 18,
    color: Colors.foreground,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerOptionText: {
    fontSize: 14,
    color: Colors.foreground,
  },
});
