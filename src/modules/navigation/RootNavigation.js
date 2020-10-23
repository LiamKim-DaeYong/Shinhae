import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigationData from './StackNavigationData';

const Stack = createStackNavigator();

export default function NavigatorView(props) {
    
    return (
        <Stack.Navigator>
            {StackNavigationData.map((item, idx) => (
                
                <Stack.Screen         
                    key={`stack_item-${idx+1}`}
                    name={item.name} 
                    component={item.component}
                    options={{
                        headerShown: false
                    }} />                                  
            ))}
        </Stack.Navigator>
    );
}