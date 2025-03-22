import React from 'react';
import { Text, View } from 'react-native';
import { API_KEY, ANOTHER_SECRET } from '@env';

export default function App() {
  console.log('API_KEY:', API_KEY);
  console.log('ANOTHER_SECRET:', ANOTHER_SECRET);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Check the console for your API key!</Text>
    </View>
  );
}
