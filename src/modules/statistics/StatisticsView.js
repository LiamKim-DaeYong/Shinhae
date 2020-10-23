import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { Header, Loading } from '../components'

export default function StatisticsScreen(props) {
    const screenWidth = Dimensions.get("window").width;

    const prductData = {
        labels: props.categories,
        datasets: [{
            data: props.prductData
        }]
    };

    const boxData = {
        labels: props.categories,
        datasets: [{
            data: props.boxData
        }]
    };

    return (
        <View style={styles.container}>
            
            <Header 
                title='통계 현황' 
                navigation={props.navigation} />
            
            <View>
                <Text style={styles.title}>일일 물류 생산량</Text>
            </View>

            <BarChart
                style={styles.chart}
                data={prductData}
                width={screenWidth-20}
                height={220}
                fromZero={true}
                showValuesOnTopOfBars={true}
                chartConfig={{                    
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    decimalPlaces: 0
                }}
            />

            <View>
                <Text style={styles.title}>일일 골판지 생산량</Text>
            </View>

            <BarChart
                style={styles.chart}
                data={boxData}
                width={screenWidth-20}
                height={220}
                fromZero={true}
                showValuesOnTopOfBars={true}
                chartConfig={{                    
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    decimalPlaces: 0
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        margin: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },
    chart: {
        margin: 10,
        alignItems: 'center'
    }
});