import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { InformationGatherer } from '../../services/InformationGatherer';
import { ProcessStep, StepStatus } from '../../types/immigration';

export default function RoadmapScreen() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        console.log('Starting roadmap generation...');
        const gatherer = new InformationGatherer();
        
        // Example values - in production these would come from user input
        const institution = 'UC Berkeley';
        const program = 'Computer Science';
        const visaType = 'F-1';
        const state = 'California';
        
        console.log('Generating roadmap for:', { institution, program, visaType, state });
        
        const roadmap = await gatherer.generateRoadmap(
          institution,
          program,
          visaType,
          state
        );
        
        console.log('Generated roadmap:', JSON.stringify(roadmap, null, 2));
        setSteps(roadmap);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load roadmap';
        console.error('Roadmap generation failed:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, []);

  const getStatusColor = (status: StepStatus) => {
    switch (status) {
      case StepStatus.COMPLETED:
        return '#4CAF50';
      case StepStatus.IN_PROGRESS:
        return '#2196F3';
      case StepStatus.BLOCKED:
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading your immigration roadmap...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Immigration Roadmap</Text>
      {steps.length === 0 ? (
        <Text style={styles.noStepsText}>No steps found. Please try again.</Text>
      ) : (
        steps.map((step) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(step.status) },
                ]}
              />
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            <Text style={styles.stepDescription}>{step.description}</Text>
            <Text style={styles.timeframe}>Timeframe: {step.timeframe}</Text>
            
            {step.substeps.length > 0 && (
              <View style={styles.substepsContainer}>
                {step.substeps.map((substep, index) => (
                  <View key={index} style={styles.substep}>
                    <View
                      style={[
                        styles.substepDot,
                        { backgroundColor: getStatusColor(substep.status) },
                      ]}
                    />
                    <Text style={styles.substepText}>{substep.title}</Text>
                  </View>
                ))}
              </View>
            )}

            {step.prerequisites.length > 0 && (
              <Text style={styles.prerequisites}>
                Prerequisites: {step.prerequisites.join(', ')}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#F44336',
    textAlign: 'center',
    fontSize: 16,
  },
  noStepsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  stepContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeframe: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  substepsContainer: {
    marginTop: 8,
    marginLeft: 20,
  },
  substep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  substepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  substepText: {
    fontSize: 14,
    color: '#666',
  },
  prerequisites: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    fontStyle: 'italic',
  },
}); 