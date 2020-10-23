import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigatorView from './RootNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="App" 
        component={NavigatorView}
        options={{
          headerShown: false
        }} />
    </Stack.Navigator> 
  );
}