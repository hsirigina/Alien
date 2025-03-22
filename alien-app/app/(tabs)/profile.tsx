import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://via.placeholder.com/100' }}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <FontAwesome name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="user" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="graduation-cap" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Education Details</Text>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="briefcase" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Work Experience</Text>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="bell" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Notifications</Text>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="lock" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
            <FontAwesome name="sign-out" size={20} color="#FF3B30" />
            <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#000000',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
}); 