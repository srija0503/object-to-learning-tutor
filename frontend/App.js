import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// --- Home Screen ---
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Details with data"
        onPress={() => navigation.navigate('Details', { user: 'Srija' })}
      />
    </View>
  );
}

// --- Details Screen ---
function DetailsScreen({ route }) {
  // route.params may be undefined if no data was passed
  const user = route.params?.user;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <Text style={{ fontSize: 20 }}>Details Screen for {user}</Text>
      ) : (
        <Text style={{ fontSize: 20 }}>Details Screen (no data)</Text>
      )}
    </View>
  );
}


// --- Main App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
