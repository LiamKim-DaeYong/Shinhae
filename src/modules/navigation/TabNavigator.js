import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import TabNavigationData from './TabNavigationData';
import AddButton from '../components/AddButton';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}) {

    return (
        <Tab.Navigator
            initialRouteName="Home">
            {TabNavigationData.map((item, idx) => (
                <Tab.Screen 
                    key={`tab_item${idx+1}`}
                    name={item.name}
                    component={item.component} 
                    options={{               
                        tabBarLabel: item.label,
                        tabBarIcon: () => {
                            return item.icon=="AddButton"
                                ?<AddButton navigation = {navigation}/>
                                :<Icon name={item.icon} size={20} style={styles.icon}/>
                            },
                    }}
                    />
            ))}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        paddingHorizontal: 10,
    },    
    tabBarIcon: {
        width: 23,
        height: 23,
    },
    icon: {
        color: "#9b9b9b",        
    }
});