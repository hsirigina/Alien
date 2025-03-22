import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the roadmap tab
  return <Redirect href="/(tabs)/roadmap" />;
} 