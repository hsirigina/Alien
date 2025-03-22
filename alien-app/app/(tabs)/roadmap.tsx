import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RoadmapScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Visa Roadmap</Text>
        <Text style={styles.subtitle}>Personalized checklist for your journey</Text>
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timelineItem}>
          <View style={styles.timelineIcon}>
            <FontAwesome name="check-circle" size={24} color="#007AFF" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Initial Assessment</Text>
            <Text style={styles.timelineDescription}>Complete your profile to get started</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.timelineIcon}>
            <FontAwesome name="circle" size={24} color="#8E8E93" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Document Collection</Text>
            <Text style={styles.timelineDescription}>Gather required documents</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.timelineIcon}>
            <FontAwesome name="circle" size={24} color="#8E8E93" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Form Preparation</Text>
            <Text style={styles.timelineDescription}>Fill out necessary forms</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.timelineIcon}>
            <FontAwesome name="circle" size={24} color="#8E8E93" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Submission</Text>
            <Text style={styles.timelineDescription}>Submit your application</Text>
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
  timelineContainer: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
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
  timelineIcon: {
    marginRight: 15,
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
}); 