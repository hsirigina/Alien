import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DocumentsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <Text style={styles.subtitle}>Manage your visa documents</Text>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton}>
          <FontAwesome name="cloud-upload" size={24} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.documentList}>
        <View style={styles.documentItem}>
          <View style={styles.documentIcon}>
            <FontAwesome name="file-pdf-o" size={24} color="#FF3B30" />
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>Passport.pdf</Text>
            <Text style={styles.documentDate}>Uploaded on Mar 20, 2024</Text>
          </View>
          <TouchableOpacity style={styles.documentAction}>
            <FontAwesome name="ellipsis-v" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <View style={styles.documentItem}>
          <View style={styles.documentIcon}>
            <FontAwesome name="file-image-o" size={24} color="#34C759" />
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>I-20.jpg</Text>
            <Text style={styles.documentDate}>Uploaded on Mar 19, 2024</Text>
          </View>
          <TouchableOpacity style={styles.documentAction}>
            <FontAwesome name="ellipsis-v" size={20} color="#8E8E93" />
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
  uploadSection: {
    padding: 20,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  documentList: {
    padding: 20,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  documentIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  documentDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  documentAction: {
    padding: 10,
  },
}); 