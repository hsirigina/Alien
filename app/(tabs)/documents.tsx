import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DocumentsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Scanner</Text>
        <Text style={styles.subtitle}>Scan and validate your documents</Text>
      </View>

      <View style={styles.scanButtonContainer}>
        <TouchableOpacity style={styles.scanButton}>
          <FontAwesome name="camera" size={32} color="#FFFFFF" />
          <Text style={styles.scanButtonText}>Scan Document</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentDocuments}>
        <Text style={styles.sectionTitle}>Recent Documents</Text>
        <View style={styles.documentList}>
          <View style={styles.documentItem}>
            <FontAwesome name="file-pdf-o" size={24} color="#FF3B30" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>Passport.pdf</Text>
              <Text style={styles.documentStatus}>Valid</Text>
            </View>
          </View>

          <View style={styles.documentItem}>
            <FontAwesome name="file-pdf-o" size={24} color="#FF3B30" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>Visa Application.pdf</Text>
              <Text style={styles.documentStatus}>Pending Review</Text>
            </View>
          </View>

          <View style={styles.documentItem}>
            <FontAwesome name="file-pdf-o" size={24} color="#FF3B30" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>Birth Certificate.pdf</Text>
              <Text style={styles.documentStatus}>Valid</Text>
            </View>
          </View>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  scanButtonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  recentDocuments: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  documentList: {
    gap: 15,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
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
  documentInfo: {
    marginLeft: 15,
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  documentStatus: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
}); 